<?php

namespace App\Command;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateBookingCommand extends Command
{
    protected static $defaultName = 'app:create-booking';
    private $manager;
    private$repo;

    public function __construct(EntityManagerInterface $manager, OrderRepository $repo)
    {
        parent::__construct();
        $this->manager = $manager;
        $this->repo = $repo;
    }

    protected function configure()
    {
        $this->setDescription('Creates or updates booking from edi file.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $json = file_get_contents(dirname(__DIR__).'/../documents/bookings.json');
        $newBookings = json_decode($json);

        $insert = 0;
        $update = 0;
        
        foreach( $newBookings as $booking)
        {
            $orderFound = $this->repo->findOneBy(['number' => $booking->number]);

            if(!$orderFound)
            {
                $order = new Order();
                $order
                    ->setNumber($booking->number)
                    ->setBooking($booking->booking)
                    ->setQuantity($booking->quantity)
                    ->setIncotermDate(new \DateTime($booking->incoterm_date))
                    ->setForwarder('000450')//($booking->forwarder)
                    ->setWarehouse($booking->warehouse)
                    ->setShipment($booking->shipment)
                    ->setIncoterm($booking->incoterm)
                    ->setSupplier($booking->supplier);
                
                $this->manager->persist($order);
                $insert++;
            }

            elseif(
                $orderFound->getBooking() !== $booking->booking ||
                $orderFound->getQuantity() !== (int)$booking->quantity ||
                date_format($orderFound->getIncotermDate(), 'Y-m-d') !== explode(" ", $booking->incoterm_date)[0] ||
                $orderFound->getWarehouse() !== $booking->warehouse
            ) {
                if ($orderFound->getIsFree()) { 
                    $orderFound
                        ->setBooking($booking->booking)
                        ->setQuantity($booking->quantity)
                        ->setIncotermDate(new \DateTime($booking->incoterm_date))
                        ->setWarehouse($booking->warehouse);
                    $update++;                  
                }
            }
        }

        $this->manager->flush();

        $output->writeln('Maj effectuée');
        $output->writeln($insert.' nouvelle(s) entrée(s),');
        $output->writeln($update.' mise(s) à jour.');

        return Command::SUCCESS;
    }
}
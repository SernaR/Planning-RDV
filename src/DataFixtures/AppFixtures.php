<?php

namespace App\DataFixtures;

use App\Entity\Order;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for($o = 0; $o < 50; $o++)
        {
            $order = new Order();
            $order
                ->setNumber('EP '.$o)
                ->setBooking('booking'.$o)
                ->setQuantity(mt_rand(100,1000))
                ->setIncotermDate($faker->dateTimeBetween($startDate = 'now', $endDate = '+ 1 months', $timezone = null))
                ->setForwarder('000450')
                ->setSupplier('fournisseur')
                ->setWarehouse($faker->randomElement(['PA', 'AE']))
                ->setShipment(null)
                ->setIncoterm('DDP');

            $manager->persist(($order));   
        }
        $manager->flush();
    }
}

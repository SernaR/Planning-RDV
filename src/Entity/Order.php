<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OrderRepository::class)
 * @ORM\Table(name="`order`")
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     normalizationContext={"groups"={"orders_read"}}, 
 * )
 */
class Order
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     */
    private $number;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     */
    private $booking;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     */
    private $quantity;

    /**
     * @ORM\Column(type="date")
     * @Groups({"orders_read"})
     */
    private $incotermDate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $forwarder;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     */
    private $warehouse;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $shipment;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $incoterm;

    
    //private $isFree;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"orders_read"})
     */
    private $supplier;

    /**
     * @ORM\ManyToMany(targetEntity=Appointment::class, mappedBy="orders")
     */
    private $appointments;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getBooking(): ?string
    {
        return $this->booking;
    }

    public function setBooking(string $booking): self
    {
        $this->booking = $booking;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getIncotermDate(): ?\DateTimeInterface
    {
        return $this->incotermDate;
    }

    public function setIncotermDate(\DateTimeInterface $incotermDate): self
    {
        $this->incotermDate = $incotermDate;

        return $this;
    }

    public function getForwarder(): ?string
    {
        return $this->forwarder;
    }

    public function setForwarder(string $forwarder): self
    {
        $this->forwarder = $forwarder;

        return $this;
    }

    public function getWarehouse(): ?string
    {
        return $this->warehouse;
    }

    public function setWarehouse(string $warehouse): self
    {
        $this->warehouse = $warehouse;

        return $this;
    }

    public function getShipment(): ?string
    {
        return $this->shipment;
    }

    public function setShipment(?string $shipment): self
    {
        $this->shipment = $shipment;

        return $this;
    }

    public function getIncoterm(): ?string
    {
        return $this->incoterm;
    }

    public function setIncoterm(string $incoterm): self
    {
        $this->incoterm = $incoterm;

        return $this;
    }

    public function isFree(): ?bool
    {
        return count($this->getAppointments()) === 0 ;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getSupplier(): ?string
    {
        return $this->supplier;
    }

    public function setSupplier(string $supplier): self
    {
        $this->supplier = $supplier;

        return $this;
    }

    /**
     * @return Collection|Appointment[]
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): self
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments[] = $appointment;
            $appointment->addOrder($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): self
    {
        if ($this->appointments->contains($appointment)) {
            $this->appointments->removeElement($appointment);
            $appointment->removeOrder($this);
        }

        return $this;
    }
}

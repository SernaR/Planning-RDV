<?php

namespace App\Entity;

use App\Repository\AppointmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AppointmentRepository::class)
 * @ApiResource(
 *     collectionOperations={"get", "post"},
 *     itemOperations={
 *          "get": {
 *              "normalization_context"={"groups"={"appointment_read"}}
 *          },
 *          "put"
 *      }
 * )
 */
class Appointment
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"plannings_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"planning_read", "appointment_read", "plannings_read"})
     */
    private $number;

    /**
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="date")
     */
    private $callDate;

    /**
     * @ORM\Column(type="date")
     * @Groups({"appointment_read"})
     */
    private $askedDate;

    /**
     * @ORM\Column(type="integer")
     */
    private $status = 0;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"planning_read", "appointment_read", "plannings_read"})
     */
    private $schedule;

    /**
     * @ORM\ManyToOne(targetEntity=Planning::class, inversedBy="appointments")
     */
    private $planning;

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
     * @ORM\ManyToMany(targetEntity=Order::class, inversedBy="appointments")
     * @Groups({"appointment_read", "plannings_read"})
     */
    private $orders;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"appointment_read", "planning_read", "plannings_read"})
     */
    private $duration;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"appointment_read", "planning_read", "plannings_read"})
     */
    private $door;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
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

    public function getCallDate(): ?\DateTimeInterface
    {
        return $this->callDate;
    }

    public function setCallDate(\DateTimeInterface $callDate): self
    {
        $this->callDate = $callDate;

        return $this;
    }

    public function getAskedDate(): ?\DateTimeInterface
    {
        return $this->askedDate;
    }

    public function setAskedDate(\DateTimeInterface $askedDate): self
    {
        $this->askedDate = $askedDate;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getSchedule(): ?\DateTimeInterface
    {
        return $this->schedule;
    }

    public function setSchedule(?\DateTimeInterface $schedule): self
    {
        $this->schedule = $schedule;

        return $this;
    }

    public function getPlanning(): ?Planning
    {
        return $this->planning;
    }

    public function setPlanning(?Planning $planning): self
    {
        $this->planning = $planning;

        return $this;
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

    /**
     * @return Collection|Order[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
        }

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getDoor(): ?string
    {
        return $this->door;
    }

    public function setDoor(string $door): self
    {
        $this->door = $door;

        return $this;
    }
    /**
     * @Groups({"plannings_read"}) 
     */
    public function isActive(): ?bool 
    {
        return $this->getStatus() === 0 //voir config
            || $this->getStatus() === 1;
    }
}

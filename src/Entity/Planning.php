<?php

namespace App\Entity;

use App\Repository\PlanningRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PlanningRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *          "post":{
 *             "controller"=App\Controller\api\FindOrCreatePlanningController::class,
 *             "normalization_context"={"groups"={"planning_read"}}     
 *          }
 *      },
 *     itemOperations={"get"}
 * )
 */
class Planning
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"planning_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"planning_read"})
     */
    private $reference;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="planning")
     * @Groups({"planning_read"})
     */
    private $appointments = [];

    public function __construct($reference)
    {
        $this->reference = $reference;
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

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
            $appointment->setPlanning($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): self
    {
        if ($this->appointments->contains($appointment)) {
            $this->appointments->removeElement($appointment);
            // set the owning side to null (unless already changed)
            if ($appointment->getPlanning() === $this) {
                $appointment->setPlanning(null);
            }
        }

        return $this;
    }
}

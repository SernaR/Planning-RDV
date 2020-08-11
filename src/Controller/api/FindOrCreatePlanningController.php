<?php

namespace App\Controller\api;

use App\Entity\Planning;
use App\Repository\PlanningRepository;
use Doctrine\ORM\EntityManagerInterface;

class FindOrCreatePlanningController
{
    private $manager;
    private $repo;
    private $planning;
    
    public function __construct(EntityManagerInterface $manager, PlanningRepository $repo)
    {
        $this->manager = $manager;
        $this->repo = $repo;
    }

    public function __invoke(Planning $data)
    {
        $reference = $data->getReference();
        $planning = $this->repo->findOneBy(["reference" => $reference]);

        if ($planning) {
            $this->planning = $planning;

        } else {
            $planning = new Planning($reference);
    
            $this->manager->persist($planning);
            $this->planning = $planning;
        }
    
        return $this->planning;
    }
}
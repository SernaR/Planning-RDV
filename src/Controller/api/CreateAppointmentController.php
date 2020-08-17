<?php

namespace App\Controller\api;

use App\Entity\Appointment;
use App\Repository\PlanningRepository;

class CreateAppointmentController
{
    private $repo;

    public function __construct(PlanningRepository $repo)
    {
        $this->repo = $repo;
    }

    public function __invoke(Appointment $data)
    {
        //vérifier si la position est toujours libre ???
        
        //$planning = $this->repo
        return $data;
    }
}
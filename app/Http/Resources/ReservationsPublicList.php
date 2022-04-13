<?php

namespace App\Http\Resources;

use Carbon\CarbonPeriod;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ReservationsPublicList extends JsonResource
{

    public function toArray($request)
    {

        $period = CarbonPeriod::create($this->start, $this->end);

        $arrayOfDates = array();

        foreach ($period as $date) {
            $arrayOfDates[]= $date->format('Y-m-d');
        }

        return $arrayOfDates;
    }

}

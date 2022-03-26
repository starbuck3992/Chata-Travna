<?php

namespace App\Http\Resources;

use Carbon\CarbonPeriod;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationsPublicList extends JsonResource
{

    public function toArray($request)
    {
        return CarbonPeriod::create($this->start, $this->end);
    }

}

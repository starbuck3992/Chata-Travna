<?php

namespace App\Http\Resources\AdminResources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationsList extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'start'         => $this->start,
            'end'           => $this->end,
            'name'          => $this->name,
            'surname'       => $this->surname,
            'email'         => $this->email,
            'city'          => $this->city,
            'zip'           => $this->zip,
            'adult_count'   => $this->adult_count,
            'child_count'   => $this->child_count,
            'pet'           => $this->pet,
            'created_at'    => $this->created_at->timezone('Europe/Prague')->format('d. m. Y H:i:s'),
        ];
    }
}

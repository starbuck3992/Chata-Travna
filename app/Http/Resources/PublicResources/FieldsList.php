<?php

namespace App\Http\Resources\PublicResources;

use Illuminate\Http\Resources\Json\JsonResource;

class FieldsList extends JsonResource
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
            'name'          => $this->name,
            'value'         => $this->value,
        ];
    }
}

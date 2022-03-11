<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReservationStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            ''

        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Tím s daným názvom už v turnaji existuje',
            'players.*.name.required' => 'Povinné pole',
            'players.*.name.alpha' => 'Nevalidný hodnota v poli',
            'players.*.surname.required' => 'Povinné pole',
            'players.*.surname.alpha' => 'Nevalidný hodnota v poli',
            'players.*.email.required' => 'Povinné pole',
            'players.*.email.email' => 'Nevalidný hodnota v poli',
            'players.*.email.unique' => 'Hráč s daným emailom už v turnaji existuje',
            'players.*.birthdate.required' => 'Povinné pole',
            'players.*.birthdate.date' => 'Nevalidný hodnota v poli',
        ];
    }
}

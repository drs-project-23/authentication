<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'form.name' => ['required', 'string', 'min:2'],
            'form.username' => ['required', 'string', 'unique:users,username'],
            'form.email' => ['required', 'email', 'unique:users,email'],
            'form.password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}

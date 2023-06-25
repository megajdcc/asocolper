<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\Models\OrdenEntrega;


class EnviarOrdenEntrega extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(protected OrdenEntrega $orden,protected array $data)
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.send-email')
        ->subject($this->data['subject'])
        ->to($this->data['to'])
        // ->from($this->data['from'])
        ->with($this->data)
        ->attachFromStorageDisk('ordenes',$this->orden->archivo);
    }
}

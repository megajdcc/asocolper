<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Viaje;

class ViajeAsignado extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected Viaje $viaje)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {   
        if($this->viaje->hora){
            $ho_me = 'Hora de salida: '. $this->viaje->hora;
        }else{
            $ho_me = 'La hora todavía no se ha definido';
        }

        if($this->viaje->tipo_viaje == 1){
            $mensaje_1 = "Te hemos seleccionado para realizar un viaje de entrega de container para el día {$this->viaje->fecha}. {$ho_me}, te estaremos informando apenas la orden de entrega esté en linea.";
        }else{
            $mensaje_1 = "Te hemos seleccionado para realizar un retiro de container para el día {$this->viaje->fecha}. {$ho_me}, No olvides estár a tiempo en el destino.";
        }

        return (new MailMessage)
                    ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                    ->line($mensaje_1)
                    ->line('Gracias por usar nuestra Aplicación!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        if ($this->viaje->hora) {
            $ho_me = 'Hora de salida: ' . $this->viaje->hora;
        } else {
            $ho_me = 'La hora todavía no se ha definido';
        }

        if ($this->viaje->tipo_viaje == 1) {
            $mensaje_1 = "Te hemos seleccionado para realizar un viaje de entrega de container para el día {$this->viaje->fecha}. {$ho_me}, te estaremos informando apenas la orden de entrega esté en linea.";
        } else {
            $mensaje_1 = "Te hemos seleccionado para realizar un retiro de container para el día {$this->viaje->fecha}. {$ho_me}, No olvides estár a tiempo en el destino.";
        }

        return [
            'titulo' => "Viaje Asignado",
            'avatar' => null,
            'usuario' => null,
            'mensaje' => ["Hola {$notifiable->getNombreCompleto()}!", $mensaje_1],
            'type' => 'light-info', // light-info , light-success, light-danger, light-warning
            'btn' => false,
            'btnTitle' => 'Ver viajes',
            'url' => ['name' => 'listar.viajes',]
        ];
    }
}

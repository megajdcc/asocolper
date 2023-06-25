<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\OrdenEntrega;

class OrdenCreada extends Notification implements ShouldQueue
{
    use Queueable;
    
    /** 
     * Create a new notification instance.
     * @param OrdenEntrega $orden
     * @param $tipo_entrega  1 => Cliente, 2 =>  Chofer
     * @return void
     */
    public function __construct(protected OrdenEntrega $orden, protected $tipo_entrega = 1)
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
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {

        if($this->tipo_entrega == 1){
            return (new MailMessage)
                ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                ->subject('Orden de entrega')
                ->line($this->orden->firmada ? 'La orden de entrega ha sido firmada, se ha iniciado el proceso del despacho' : 'La Orden de entrega ha sido generada o modificada, pero es necesario que la misma esté firmada antes del despacho del container')
                ->line('Gracias por usar nuestra aplicación!');
                
        }else{

            return (new MailMessage)
                ->greeting("Hola {$notifiable->getNombreCompleto()}!")
                ->subject('Orden de entrega')
                ->line($this->orden->firmada ? 'La orden de entrega ha sido firmada, ya puedes proceder con la entrega del container' : 'La Orden de entrega ha sido generada o modificada, pero es necesario que la misma esté firmada antes del despacho del container')
                ->line('Gracias por usar nuestra aplicación!');
                
        }

     
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

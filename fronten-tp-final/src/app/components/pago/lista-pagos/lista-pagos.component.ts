import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; //para usar ngModel
import { Pago } from '../../../models/pago/pago';
import { PagoService } from '../../../services/pago/pago.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Alquiler } from '../../../models/alquiler/alquiler';
import { AlquilerService } from '../../../services/alquiler/alquiler.service';
declare const MercadoPago: any;

@Component({
  selector: 'app-lista-pagos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './lista-pagos.component.html',
  styleUrl: './lista-pagos.component.css'
})
export class ListaPagosComponent {
  //ATRIBUTOS
  auxListaPagos:Array<Pago>;
  auxIdAlquiler:any; //luego se hace string para guardar el ID
  auxObAlquiler:Alquiler;
  private mp: any;
  notificaionDelPago:string; //creada para recibir lo de "notification_url"

  //CONSTRUCTOR;
  constructor(private pagoService:PagoService, private router:ActivatedRoute,
    private http: HttpClient, private alquilerService:AlquilerService) {
    this.auxListaPagos = [];
    this.auxIdAlquiler = "";
    this.auxObAlquiler = new Alquiler();
    this.notificaionDelPago = "";
    this.cargarID();
    this.mp = new MercadoPago('APP_USR-ab91be51-3780-4d62-a1e4-3ebc339fa981', { //Aqui pava PUBLIC_KEY deMercadoPago
      locale: 'es-AR' //Este es el idioma con que se muestra el cobro.
    });
  }


  //METODOS
  cargarID():void{
    this.router.paramMap.subscribe(params =>{
      this.auxIdAlquiler = params.get('id');
      console.log(this.auxIdAlquiler);
      this.obtenerPagosPorAlquiler();
      //METODO TRAER ALQUILER 
      this.obtenerAlquilerPorId();
    })
  }

  //GET Obtener alquiler filtrado por ID de Propietario
  obtenerAlquilerPorId():void{
    this.alquilerService.obtenerAlquilerPorId(this.auxIdAlquiler).subscribe(
      (ultado:any)=>{
        this.auxObAlquiler=ultado.data;
        console.log("MI OBJETO ALQUILER CRUDO");
        console.log(ultado.data);
      }
    )
  }

  obtenerPagosPorAlquiler():void{
    this.pagoService.getObtenerPagosPorAlquiler(this.auxIdAlquiler).subscribe(
      (ultado:any)=>{
        this.auxListaPagos=ultado;
        console.log("MI OBJETO CRUDO");
        console.log(ultado);
        console.log("MI OBJETO COMO LISTA");
        console.log(this.auxListaPagos);
      }
    )

  }

////////////////////////////////////////////////////////////////
  //MERCADO PAGO

  ngOnInit(): void {
    const checkoutBtn = document.getElementById('checkout-btn'); //"checkout-btn" es el ID del boton PAGAR
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', this.createOrder.bind(this));
    }
  }

  async createOrder(): Promise<void> {
    try {
      const orderData = {
        //title: 'Esta Pagando por Local '+this.auxObAlquiler.local.nombreNumerico+' El Local esta a nombre de: '+this.auxObAlquiler.propietario.apellido+" "+this.auxObAlquiler.propietario.nombre,
        title:this.auxObAlquiler._id,
        quantity: 1,
        price: this.auxObAlquiler.costoAlquiler,
        custom_id:"Alquilercillos",
        //notification_url:'https://e110-190-52-34-60.ngrok-free.app/webhook'
      };
   
      
      const response = await this.http.post<{ id: string }>('http://localhost:3000/create_preference', orderData).toPromise();

      if (response && response.id) {
        this.createCheckoutButton(response.id);
      }
    } catch (error) {
      alert('error.message');
    }
    console.log("RESPUESTA DE notificaionDelPago");
    console.log(this.notificaionDelPago);
  }

  createCheckoutButton(preferenceId: string): void {
    const bricksBuilder = this.mp.bricks();
    const renderComponent = async () => {
    //if (window.checkoutButton) window.checkoutButton.unmount();
      await bricksBuilder.create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId,
        },
      });
    };
    renderComponent();
  }

 






}

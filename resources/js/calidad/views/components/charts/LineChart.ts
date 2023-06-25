import { defineComponent, h, PropType,toRefs,watch } from 'vue'

import { Line } from 'vue-chartjs'
import {
   Chart as ChartJS,
   Title,
   Tooltip,
   Legend,
   LineElement,
   LinearScale,
   PointElement,
   CategoryScale,
   Plugin
} from 'chart.js'

ChartJS.register(
   Title,
   Tooltip,
   Legend,
   LineElement,
   LinearScale,
   PointElement,
   CategoryScale
)

export default defineComponent({
   name: 'LineChart',
   components: {
      Line
   },
   props: {
      chartId: {
         type: String,
         default: 'line-chart-js'
      },
      width: {
         type: Number,
         default: 400
      },
      height: {
         type: Number,
         default: 400
      },
      cssClasses: {
         default: '',
         type: String
      },
      styles: {
         type: Object,
         default: () => {
            height:'100%'
          }
      },
      plugins: {
         type: Array,
         default: () => []
      },
      chartData:{
         type:Object,
         default: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
               {
                  label: 'Data One',
                  backgroundColor: '#f87979',
                  data: [40, 39, 10, 40, 39, 80, 40,100,80,65,36,23]
               }
            ]
         }
      }
   },

   // mixins:[mixins.reactiveProp],

   setup(props) {

      const {chartData} = toRefs(props)
      
      const chartOptions = {
         responsive: true,
         maintainAspectRatio: false
      }
      

      return () =>
         h(Line, {
            props:{
               chartData:chartData.value,
               chartOptions,
               chartId: props.chartId,
               width: props.width,
               height: props.height,
               cssClasses: props.cssClasses,
               styles: props.styles,
               plugins: props.plugins
            }
           
         })
   }
})

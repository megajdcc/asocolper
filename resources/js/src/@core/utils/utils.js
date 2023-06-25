import router from '@/router'
// eslint-disable-next-line object-curly-newline
import { reactive, getCurrentInstance, watch, toRefs,ref } from 'vue'
import Swal from 'sweetalert2'
export const isObject = obj => typeof obj === 'object' && obj !== null
import 'animate.css';
import store from '@/store'
import axios from 'axios'
import moment from 'moment';


export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}


const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]

// ? Light and Dark variant is not included
// prettier-ignore
export const getRandomBsVariant = () => getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

export const isDynamicRouteActive = route => {
  const { route: resolvedRoute } = router.resolve(route)
  return resolvedRoute.path === router.currentRoute.path
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy
  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const getStatus = (val) => {

  const situaciones = ['Importado', 'Por Asignar', 'Asignado', 'En ruta', 'Entregado', 'En Espera'];

  return situaciones[val - 1];

}


export const  chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)',
}

export const cantidadNoches = (fecha_inicial, fecha_final) => {
  let noches = moment(new Date(fecha_final)).diff(fecha_inicial, 'days');

  return noches;
} 

export const optionsCurrency = ref({
            currency:'USD',
            locale:'es-ES',
            autoDecimalDigits:true,
         })




export const verificarActualizacion = () => {
  let miversion = store.state.app.version;

  axios.get('/api/get/version').then(({data}) => {

    if (data.version != localStorage.getItem('version-app')){
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: `Nueva versión del sistema`,
        text: `Nota de la versión: ${data.nota}`,
        confirmButtonText: 'Actualizar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      }).then((result) => {
        
        if(result.isConfirmed){
          store.commit('app/setVersion',data.version)
          setTimeout(() => {
            location.reload(true)
          }, 500);
        }

      })

    }


  })



} 


export const regresar = () => {

  window.history.length ? router.go(-1) : router.push('home');

}

export const getFecha = (fecha) => {
  return moment(fecha).format('LLL');
} 


export const optionsSituaciones  = [
  //1  Importado, 2 => por asignar, 3 => asignador , 4 => en ruta, 5 => entregado, 6 =>  en espera.
    {
      value:1,
     text:'Importado'
    },
    {
      value: 2,
      text: 'Por Asignar'
    },
    {
      value: 3,
      text: 'Asignado'
    },
    {
      value: 4,
      text: 'En ruta'
    },
    {
      value: 5,
      text: 'Entregado'
    },
    {
      value: 6,
      text: 'En espera'
    }
]

export const getImage = (archivo) => {

  switch (archivo.tipo) {
    case 'jpg':
      return archivo.uri;
    break;

    case 'png':
      return archivo.uri;
      break;

    case 'jpeg':
      return archivo.uri;
      break;

    case 'svg':
      return archivo.uri;
      break;

  }

}

export const getExt = (archivo,separator = '.') => {
  
  let archive =  archivo.split(separator)
  let ext =  (archive.length > 1) ? archive[archive.length - 1] : null;
  return ext;
} 


export const colorRand = () => {

  let colores = [
    '#397DAD',
    '#4D616C',
    '#D02412',
    '#CD960E',
    '#348022',
    '#17B6AA',
    '#5F2626',
    // '#00AEFF',
    '#6574cd',
    '#9561e2',
    '#f66d9b',
    '#e3342f',
    '#f6993f',
    // '#ffed4a',
    '#38c172',
    // '#4dc0b5',
    // '#6cb2eb',
    '#444444',
    // '#00c0ef',
  ];
  var i = random(0, colores.length);
  return colores[i];
}

export const redondeo = (num, decimales = 2) => {
  
  var signo = (num >= 0 ? 1 : -1);

  num = num * signo;

  if (decimales === 0)
    return signo * Math.round(num);

  num = num.toString().split('e');

  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));

  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));

}

export const random = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

export const feathers =[
        'ActivityIcon',
        'AirplayIcon',
        'AlertCircleIcon',
        'AlertOctagonIcon',
        'AlertTriangleIcon',
        'AlignCenterIcon',
        'AlignJustifyIcon',
        'AlignLeftIcon',
        'AlignRightIcon',
        'AnchorIcon',
        'ApertureIcon',
        'ArchiveIcon',
        'ArrowDownCircleIcon',
        'ArrowDownLeftIcon',
        'ArrowDownRightIcon',
        'ArrowDownIcon',
        'ArrowLeftCircleIcon',
        'ArrowLeftIcon',
        'ArrowRightCircleIcon',
        'ArrowRightIcon',
        'ArrowUpCircleIcon',
        'ArrowUpLeftIcon',
        'ArrowUpRightIcon',
        'ArrowUpIcon',
        'AtSignIcon',
        'AwardIcon',
        'BarChart2Icon',
        'BarChartIcon',
        'BatteryChargingIcon',
        'BatteryIcon',
        'BellOffIcon',
        'BellIcon',
        'BluetoothIcon',
        'BoldIcon',
        'BookOpenIcon',
        'BookIcon',
        'BookmarkIcon',
        'BoxIcon',
        'BriefcaseIcon',
        'CalendarIcon',
        'CameraOffIcon',
        'CameraIcon',
        'CastIcon',
        'CheckCircleIcon',
        'CheckSquareIcon',
        'CheckIcon',
        'ChevronDownIcon',
        'ChevronLeftIcon',
        'ChevronRightIcon',
        'ChevronUpIcon',
        'ChevronsDownIcon',
        'ChevronsLeftIcon',
        'ChevronsRightIcon',
        'ChevronsUpIcon',
        'ChromeIcon',
        'CircleIcon',
        'ClipboardIcon',
        'ClockIcon',
        'CloudDrizzleIcon',
        'CloudLightningIcon',
        'CloudOffIcon',
        'CloudRainIcon',
        'CloudSnowIcon',
        'CloudIcon',
        'CodeIcon',
        'CodepenIcon',
        'CodesandboxIcon',
        'CoffeeIcon',
        'ColumnsIcon',
        'CommandIcon',
        'CompassIcon',
        'CopyIcon',
        'CornerDownLeftIcon',
        'CornerDownRightIcon',
        'CornerLeftDownIcon',
        'CornerLeftUpIcon',
        'CornerRightDownIcon',
        'CornerRightUpIcon',
        'CornerUpLeftIcon',
        'CornerUpRightIcon',
        'CpuIcon',
        'CreditCardIcon',
        'CropIcon',
        'CrosshairIcon',
        'DatabaseIcon',
        'DeleteIcon',
        'DiscIcon',
        'DivideCircleIcon',
        'DivideSquareIcon',
        'DivideIcon',
        'DollarSignIcon',
        'DownloadCloudIcon',
        'DownloadIcon',
        'DribbbleIcon',
        'DropletIcon',
        'Edit2Icon',
        'Edit3Icon',
        'EditIcon',
        'ExternalLinkIcon',
        'EyeOffIcon',
        'EyeIcon',
        'FacebookIcon',
        'FastForwardIcon',
        'FeatherIcon',
        'FigmaIcon',
        'FileMinusIcon',
        'FilePlusIcon',
        'FileTextIcon',
        'FileIcon',
        'FilmIcon',
        'FilterIcon',
        'FlagIcon',
        'FolderMinusIcon',
        'FolderPlusIcon',
        'FolderIcon',
        'FramerIcon',
        'FrownIcon',
        'GiftIcon',
        'GitBranchIcon',
        'GitCommitIcon',
        'GitMergeIcon',
        'GitPullRequestIcon',
        'GithubIcon',
        'GitlabIcon',
        'GlobeIcon',
        'GridIcon',
        'HardDriveIcon',
        'HashIcon',
        'HeadphonesIcon',
        'HeartIcon',
        'HelpCircleIcon',
        'HexagonIcon',
        'HomeIcon',
        'ImageIcon',
        'InboxIcon',
        'InfoIcon',
        'InstagramIcon',
        'ItalicIcon',
        'KeyIcon',
        'LayersIcon',
        'LayoutIcon',
        'LifeBuoyIcon',
        'Link2Icon',
        'LinkIcon',
        'LinkedinIcon',
        'ListIcon',
        'LoaderIcon',
        'LockIcon',
        'LogInIcon',
        'LogOutIcon',
        'MailIcon',
        'MapPinIcon',
        'MapIcon',
        'Maximize2Icon',
        'MaximizeIcon',
        'MehIcon',
        'MenuIcon',
        'MessageCircleIcon',
        'MessageSquareIcon',
        'MicOffIcon',
        'MicIcon',
        'Minimize2Icon',
        'MinimizeIcon',
        'MinusCircleIcon',
        'MinusSquareIcon',
        'MinusIcon',
        'MonitorIcon',
        'MoonIcon',
        'MoreHorizontalIcon',
        'MoreVerticalIcon',
        'MousePointerIcon',
        'MoveIcon',
        'MusicIcon',
        'Navigation2Icon',
        'NavigationIcon',
        'OctagonIcon',
        'PackageIcon',
        'PaperclipIcon',
        'PauseCircleIcon',
        'PauseIcon',
        'PenToolIcon',
        'PercentIcon',
        'PhoneCallIcon',
        'PhoneForwardedIcon',
        'PhoneIncomingIcon',
        'PhoneMissedIcon',
        'PhoneOffIcon',
        'PhoneOutgoingIcon',
        'PhoneIcon',
        'PieChartIcon',
        'PlayCircleIcon',
        'PlayIcon',
        'PlusCircleIcon',
        'PlusSquareIcon',
        'PlusIcon',
        'PocketIcon',
        'PowerIcon',
        'PrinterIcon',
        'RadioIcon',
        'RefreshCcwIcon',
        'RefreshCwIcon',
        'RepeatIcon',
        'RewindIcon',
        'RotateCcwIcon',
        'RotateCwIcon',
        'RssIcon',
        'SaveIcon',
        'ScissorsIcon',
        'SearchIcon',
        'SendIcon',
        'ServerIcon',
        'SettingsIcon',
        'Share2Icon',
        'ShareIcon',
        'ShieldOffIcon',
        'ShieldIcon',
        'ShoppingBagIcon',
        'ShoppingCartIcon',
        'ShuffleIcon',
        'SidebarIcon',
        'SkipBackIcon',
        'SkipForwardIcon',
        'SlackIcon',
        'SlashIcon',
        'SlidersIcon',
        'SmartphoneIcon',
        'SmileIcon',
        'SpeakerIcon',
        'SquareIcon',
        'StarIcon',
        'StopCircleIcon',
        'SunIcon',
        'SunriseIcon',
        'SunsetIcon',
        'TabletIcon',
        'TagIcon',
        'TargetIcon',
        'TerminalIcon',
        'ThermometerIcon',
        'ThumbsDownIcon',
        'ThumbsUpIcon',
        'ToggleLeftIcon',
        'ToggleRightIcon',
        'ToolIcon',
        'Trash2Icon',
        'TrashIcon',
        'TrelloIcon',
        'TrendingDownIcon',
        'TrendingUpIcon',
        'TriangleIcon',
        'TruckIcon',
        'TvIcon',
        'TwitchIcon',
        'TwitterIcon',
        'TypeIcon',
        'UmbrellaIcon',
        'UnderlineIcon',
        'UnlockIcon',
        'UploadCloudIcon',
        'UploadIcon',
        'UserCheckIcon',
        'UserMinusIcon',
        'UserPlusIcon',
        'UserXIcon',
        'UserIcon',
        'UsersIcon',
        'VideoOffIcon',
        'VideoIcon',
        'VoicemailIcon',
        'Volume1Icon',
        'Volume2Icon',
        'VolumeXIcon',
        'VolumeIcon',
        'WatchIcon',
        'WifiOffIcon',
        'WifiIcon',
        'WindIcon',
        'XCircleIcon',
        'XOctagonIcon',
        'XSquareIcon',
        'XIcon',
        'YoutubeIcon',
        'ZapOffIcon',
        'ZapIcon',
        'ZoomInIcon',
        'ZoomOutIcon']



/**
 * This is just enhancement over Object.extend [Gives deep extend]
 * @param {target} a Object which contains values to be overridden
 * @param {source} b Object which contains values to override
 */
// export const objectExtend = (a, b) => {
//   // Don't touch 'null' or 'undefined' objects.
//   if (a == null || b == null) {
//     return a
//   }

//   Object.keys(b).forEach(key => {
//     if (Object.prototype.toString.call(b[key]) === '[object Object]') {
//       if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = b[key]
//       } else {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = objectExtend(a[key], b[key])
//       }
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       a[key] = b[key]
//     }
//   })

//   return a
// }

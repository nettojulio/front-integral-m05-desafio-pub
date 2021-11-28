import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import { Tabs, Tab, AppBar, Typography, Box } from "@material-ui/core"
// import { InsertDriveFile } from "@mui/icons-material";
// import PropTypes from 'prop-types';
// import home from '../../assets/home.svg';
import customerScreen from '../../assets/customerScreen.svg'
// import customersSidebarSelected from '../../assets/customersSidebarSelected.svg'
// import billings from '../../assets/billings.svg'
import imgPerfil from '../../assets/imgPerfil.png'
import './style.css'


export default function HeaderBar() {

  < div className='container' >
    <header>
      <span className='header_span'>Clientes</span>

      <div className='flex'>
        <img className='header_img' alt="Header" src={imgPerfil} />
        <span className='header_span'>Lorena</span>
      </div>
    </header>

    <div className='linha'></div>

    <div className='principal flex'>
      <div className='corpo flex'>
        <div className='logoRow'>
          <div className='collum'>
            <img src={customerScreen} alt="Customer Screen" />
          </div>
        </div>

        <span>Clientes</span>

      </div>

      <div className='div--row'>
        <button>+ Adicionar cliente</button>

        <input type="text" name="nome" value="Pesquisa"></input>
      </div>

    </div>

  </div>

}
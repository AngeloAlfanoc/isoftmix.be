import LoaderComponent from './Loader';
import React from 'react';
import axios from 'axios'
import {frontConfig} from '../../settings/frontconfig'

class TechTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties:[],
            data: [],
            isLoaded:false,
            isLoadedProperties:false,
            location: window
                .location
                .pathname
                .slice(13, window.location.pathname.length)
                .replace('_', ' ')
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async() => {
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getProducts)
            .then((result) => {
                this.setState({isLoaded: true, data: result.data.reverse().filter(function(item) {
                    return item.acf.tech_tabel_entry === true
                 })});
        
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
        await axios
            .get(frontConfig.mainRestRef + frontConfig.mainJsonStream + frontConfig.getSections)
            .then((result) => {
                this.setState({isLoadedProperties: true, properties: result.data[3].acf});
        
            }, (error) => {
                this.setState({isLoaded: false, error});
            })
    }
    buildTablesHead = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (<th style={{color:'#FFBF37'}} key={i} scope="col">{item.acf.product_name_de}</th>)
            }
            else{
                return (<th key={i} scope="col">{item.acf.product_name_de}</th>)
            }              
        })
    }
    buildTablesBodyCapaciteit = (data) => {
        return data.map((item, i) => {  
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.capaciteitmxfh}</td>)
            }else{
                return (  <td key={i}>{item.acf.capaciteitmxfh}</td>)
             
            }
        })
    }
    buildTablesBodyNominaal = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.nominaal_debiet}</td>)
            } else{
                return (  <td key={i}>{item.acf.nominaal_debiet}</td>)
             
            }
        })
    }
    buildTablesBodyMaxDebiet = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.max_debiet}</td>)
            }else{
                return (  <td key={i}>{item.acf.max_debiet}</td>)
             
            }
        })
    }
    buildTablesBodyiMIX = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.imix_volume_in_liters}</td>)
            } else{
                return (  <td key={i}>{item.acf.imix_volume_in_liters}</td>)
             
            }
        })
    }
    buildTablesBodyZoutvraag = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.zoutvraag_in_kg}</td>)
            } else{
                return (  <td key={i}>{item.acf.imix_volume_in_liters}</td>)
             
            }
        })
    }
    buildTablesBodyWaterverbruik = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.waterverbruikinm}</td>)
            } else{
                return (  <td key={i}>{item.acf.imix_volume_in_liters}</td>)
             
            }
        })
    }
    buildTablesBodyWerkdruikMinMax = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.werkdruk_min_max_in_bar}</td>)
            } else{
                return (  <td key={i}>{item.acf.werkdruk_min_max_in_bar}</td>)
             
            }
        })
    }
    buildTablesBodyWerkTempInC = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.werktemperatuur_in_c}</td>)
            } else{
                return (  <td key={i}>{item.acf.werktemperatuur_in_c}</td>)
             
            }
        })
    }
    buildTablesBodyMaxTempInC = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.max_temperatuur}</td>)
            } else{
                return (  <td key={i}>{item.acf.max_temperatuur}</td>)
            }
        })
    }
    buildTablesBodyAansluitingInOut = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.aansluitingen_in_out}</td>)
            } else{
                return (  <td key={i}>{item.acf.aansluitingen_in_out}</td>)
            }
        
        })
    }
    buildTablesBodyElekAan = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600',borderBottom:0}} key={i}>{item.acf.elektrische_aansluiting}</td>)
            } else{
                return (  <td key={i}>{item.acf.elektrische_aansluiting}</td>)
            }
        })
    }
    buildTablesBodyPekelbak = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600', color:'#FFBF37',borderRight:0}} key={i}>{item.acf.pekelbak}</td>)
            } else{
                return (  <td key={i} style={{borderRight:0}}>{item.acf.pekelbak}</td>)
            }
        })
    }
    buildTablesBodyVolumeInLiters = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.volume_in_liters}</td>)
            } else{
                return (  <td key={i}>{item.acf.volume_in_liters}</td>)
            }
        })
    }
    buildTablesBodyDiameterHoogte = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600',borderBottom:1+'px #d1d1d1 solid'}}  key={i}>{item.acf.diameter_x_hoogte_in_mm}</td>)
            } else{
                return (  <td style={{borderBottom:1+'px #d1d1d1 solid'}} key={i}>{item.acf.diameter_x_hoogte_in_mm}</td>)
            }
        })
    }
    buildTablesBodyBreedte = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.breedte}</td>)
            } else{
                return (  <td key={i}>{item.acf.breedte}</td>)
            }
        })
    }
    buildTablesBodyDiepte = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.diepte}</td>)
            } else{
                return (  <td key={i}>{item.acf.diepte}</td>)
            }
         })
    }
    buildTablesBodyHoogte = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600'}} key={i}>{item.acf.hoogte}</td>)
            } else{
                return (  <td key={i}>{item.acf.hoogte}</td>)
            }
             })
    }
    buildTablesBodyOptieUV = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600',color:'#FFBF37',borderRight:0}} key={i}>{item.acf.optie_uv}</td>)
            } else{
                return (  <td key={i} style={{borderRight:0}}>{item.acf.optie_uv}</td>)
            }
             })
    }
    buildTablesBodyVermogenVanDeLamp = (data) => {
        return data.map((item, i) => {
            if (this.state.location === item.acf.product_name_de.toLowerCase() ) {
                return (  <td style={{fontWeight:'600',borderBottom:1+'px #d1d1d1 solid', borderLeft:1+'px #d1d1d1 solid'}} key={i}>{item.acf.vermogen_van_de_lamp_in_w}</td>)
            } else{
                return (  <td key={i} style={{borderBottom:1+'px #d1d1d1 solid', borderLeft:1+'px #d1d1d1 solid'}}>{item.acf.vermogen_van_de_lamp_in_w}</td>)
            }
             })
    }
    render() {
        const {data,properties,isLoaded,isLoadedProperties} = this.state;
        if (isLoaded===true && isLoadedProperties===true) {
             return (
            <section style={{overflowX:'auto'}} id="techTable" className="container mt-5">
                <table className="table mt-5">
                    <thead>
                        <tr className="w-100">
                            <th scope="col" style={{fontWeight:500, fontStyle:'italic'}}>{properties.technische_tabel_de}</th>
                            {this.buildTablesHead(data)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
             <th scope="row" style={{fontWeight:300}}>{properties.capaciteit_de}</th>
                            {this.buildTablesBodyCapaciteit(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.nominaal_de}</th>
                            {this.buildTablesBodyNominaal(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.max_debiet_de}</th>
                            {this.buildTablesBodyMaxDebiet(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.volume_in_liters_de}</th>
                            {this.buildTablesBodyiMIX(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.zoutvraag_in_kilo_de}</th>
                            {this.buildTablesBodyZoutvraag(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.waterverbruik_in_m_de}</th>
                            {this.buildTablesBodyWaterverbruik(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.werkdruk_min_max_in_bar_de}</th>
                            {this.buildTablesBodyWerkdruikMinMax(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.werktemperatuur_in_graden_de}</th>
                            {this.buildTablesBodyWerkTempInC(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.max_temperatuur_in_graden_de}</th>
                            {this.buildTablesBodyMaxTempInC(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.aansluitingen_in_out_de}</th>
                            {this.buildTablesBodyAansluitingInOut(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.elektrische_aansluiting_de}</th>
                            {this.buildTablesBodyElekAan(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:500, fontStyle:'italic',borderRight:0}} className="pt-4">{properties.pekelbak_de}</th>
                            {this.buildTablesBodyPekelbak(data)}
                        </tr>

                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.volume_in_liters_de}</th>
                            {this.buildTablesBodyVolumeInLiters(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.diameter_x_hoogte_in_mm_de}</th>
                            {this.buildTablesBodyDiameterHoogte(data)}
                        </tr>

                        <tr>
                            <th scope="row" style={{fontWeight:500, fontStyle:'italic',borderRight:0}}>{properties.afmetingen_per_fles_in_mm_de}</th>
                            
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.breedte_de}</th>
                            {this.buildTablesBodyBreedte(data)}
                        </tr>
                        <tr>
                            <th scope="row"  style={{fontWeight:300}}>{properties.diepte_de}</th>
                            {this.buildTablesBodyDiepte(data)}
                        </tr>
                        <tr>
                            <th scope="row" style={{fontWeight:500, fontStyle:'italic',borderRight:0}}>{properties.optie_uv_de}</th>
                            {this.buildTablesBodyOptieUV(data)}
                        </tr>
                        <tr>
                            <th scope="row" style={{fontWeight:300,borderBottom:1+'px #d1d1d1 solid'}}>{properties.vermogen_van_de_lamp_in_watt_de}</th>
                            {this.buildTablesBodyVermogenVanDeLamp(data)}
                        </tr>
                    </tbody>
                </table>
            </section>
        );
        }
        else{
            return <LoaderComponent/>
        }
       
    }
}

export default TechTable;
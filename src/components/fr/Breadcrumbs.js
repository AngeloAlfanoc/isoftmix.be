import {Link} from 'react-router-dom';
import React from 'react'

class BreadcrumbsComponent extends React.Component {
    generateBreadCrumb(pathname) {
        let paths = pathname.split("/");
        paths = paths[paths.length-1] === "" ? paths.slice(0, paths.length-1): paths;
        paths = paths[1] === "" ? paths.slice(1) : paths;
        let breadcrumb = paths.map((path, index) => {
            let arrow = index !== paths.length-1 ?  ' / ' : " ";
            if (index === 0) {
                return (<li key={index}  className="px-1"><Link key={index} to="/fr/">Home</Link>{arrow}</li>);
            }
            let url = paths.slice(0, index+1).join('/');
            if (index === 2 || index === 3) {
                return (<li key={index} className="px-1"><Link key={index} to={url}>{path.replace('_', ' ')}</Link>{arrow+' '} </li>);
            }
            else{
                return ''
            }
            
        });
        return (<ul className="breadcrumb bg-white">{breadcrumb}</ul>);
    }
    render() {
        let breadcrumb = this.generateBreadCrumb(window.location.pathname);
        return ( 
            <div className="container mb-0"> 
            <nav aria-label="breadcrumb" className="my-3">  {breadcrumb}</nav>
             
            </div>);
    }
}


export default BreadcrumbsComponent;
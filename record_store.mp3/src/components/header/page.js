import styles from "./header.module.css"
import { SearchBar } from "../SearchBar/page"
import Link from "next/link"



export default function Header(props){
    let logoLocation = 
    console.log(props.logged)
    let destination = "#"
    let message = "Log in"

    if (props.logged){
        // set logged info
        destination = "#"
        message = "Salty"
    }

    

    return (
        <div className={styles.container}>
            {/* The logo */}
            <div className={styles.logo}>
                <img alt="Logo" src="/logo.png" className={styles.image}></img>
               <Link className={styles.links} href="/"><h1 className={styles.logoText}>Record Store.mp3</h1></Link> 
            </div>
            {/* The collection of other links */}
            <div className={styles.linkContainer}>
               
                <Link className={styles.links} href={destination}><h3 className={styles.linkText}>{message}</h3></Link>
                
      
                <Link className={styles.links} href="#"><h3 className={styles.linkText}>Albums</h3></Link>
                <Link className={styles.links} href="#"><h3 className={styles.linkText}>Lists</h3></Link>
                <SearchBar></SearchBar>
            </div>
        </div>
    )

}

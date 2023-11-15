import "../styles/global.css"

export default function App(props){
    return(
        <div>
            <props.Component></props.Component>
        </div>
    )
}
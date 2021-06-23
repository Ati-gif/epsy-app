import FormattedMessage from "./FormattedMessage"

export default ({name, email})=>{
    return(
        <FormattedMessage>
            <h1>{name}</h1>
            <p>{email}</p>
        </FormattedMessage>
    )
}
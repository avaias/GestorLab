import { View, StyleSheet, Text } from "react-native"

export const DangerAlert = (props) => {
    return(
        <Text style = {[styles.alertContainer, styles.dangerAlertContainer, styles.dangerAlertText, props.style]}>{props.text}</Text>
    )
}

export const SuccessAlert = (props) =>{
    return(
        <Text style = {[styles.alertContainer, styles.successAlertContainer, props.style, styles.successAlertText]}>{props.text}</Text>
    )
}


const styles = StyleSheet.create({
    alertContainer: {
        borderWidth: 2,
        textAlign: "center",
        width: "100%",
        borderRadius: 5,
        padding: 10
    },
    dangerAlertContainer:{  
        backgroundColor: "#ff8791",
        borderColor: "#fc7e89"
    },
    dangerAlertText:{
        color: "#781911",
        fontWeight: '500'
    },
    successAlertContainer:{  
        backgroundColor: "#9ef0ad",
        borderColor: "#81db92"
    },
    successAlertText:{
        color: "#107823"
    }
});
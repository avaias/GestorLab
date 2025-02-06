import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = (props) =>{
    return(
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
            <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#875AE6',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})


export default CustomButton;
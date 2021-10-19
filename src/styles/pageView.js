import { StyleSheet } from "react-native";
import { BGCOLOR } from "../environement";

export default StyleSheet.create({
    pageView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGCOLOR
    },
    pageFlex :{
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: BGCOLOR
    },
    spaceBt: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        backgroundColor: BGCOLOR
    }
})

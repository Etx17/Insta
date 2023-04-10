import {StyleSheet} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export default StyleSheet.create(
    {
        root:{
            padding: 10,
        },
        headerRow:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginVertical: 10,
        },
        avatar:{
            aspectRatio: 1,
            borderRadius:50,

        },
        numberContainer:{
            alignItems:'center',
        },
        numberText:{
            fontSize: fonts.size.md,
            fontWeight: fonts.weight.bold,
            color: colors.black,
        },
        name:{
            fontSize: fonts.size.md,
            fontWeight: fonts.weight.bold,
            color: colors.black,
        },
        bio:{
            fontSize: fonts.size.md,
            fontWeight: fonts.weight.regular,
        },
        buttonsContainer:{
            flexDirection:'row',
        },

    }
);
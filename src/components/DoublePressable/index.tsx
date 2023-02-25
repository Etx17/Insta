import { ReactNode } from 'react';
import {Text, Pressable} from 'react-native'

interface IDoublePressable {
    onDoublePress?: () => void;
    children: ReactNode;
}
const DoublePressable = ({
    onDoublePress = () => {}, 
    children, 
}: IDoublePressable) => {
    let lastTap = 0;
    const handleDoublePress = () => {
        const now = Date.now(); // timestamp 12358004335
        if (lastTap && (now - lastTap) < 400) {
            onDoublePress();
        }
        lastTap = now;
    }
    return (
        <Pressable onPress={handleDoublePress}>
            {children}
        </Pressable>
    )
}

export default DoublePressable;
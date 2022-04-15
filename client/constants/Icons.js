import React from "react";
import { TouchableOpacity, Pressable } from "react-native-gesture-handler";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import MatCom from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
const isApple = Platform.OS === "ios";

export const FavFilled = (props) => {
  return (
    <MatIcon
      name={"favorite"}
      size={30}
      color={"white"}
      onPress={props.onPress}
      {...props}
    />
  );
};

export const FavOutline = (props) => {
  return (
    <MatIcon name={"favorite-outline"} size={30} color={"white"} {...props} />
  );
};

export const MenuIcon = (props) => {
  return (
    <MatIcon
      {...props}
      name={"menu"}
      size={40}
      color={props.color}
      onPressIn={() => props.onPress}
      style={{ position: "relative", left: isApple ? 10 : 0, ...props.style }}
    />
  );
};

export const HomeOutline = (props) => {
  return (
    <Ionicon
      {...props}
      name={"ios-home-outline"}
      size={40}
      color={"white"}
      onPress={props.onPress}
    />
  );
};

export const HomeFilled = (props) => (
  <Ionicon
    {...props}
    name="ios-home"
    size={40}
    color={"white"}
    onPress={props.onPress}
  />
);

export const FilterIcon = (props) => {
  return (
    <Ionicon
      {...props}
      name={"ios-filter"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const FilterOutline = (props) => {
  return (
    <Ionicon
      {...props}
      name={"ios-filter-outline"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const SaveOutline = (props) => {
  return (
    <Ionicon
      {...props}
      name={"save-outline"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const SaveFilled = (props) => {
  return (
    <Ionicon
      {...props}
      name={"save"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const Person = (props) => {
  return (
    <Ionicon
      {...props}
      name={"ios-person"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const Store = (props) => {
  return (
    <MatIcon
      {...props}
      name={"shop"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const Cart = (props) => {
  return (
    <MatIcon
      {...props}
      name={"shopping-cart"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const AddIcon = (props) => {
  return (
    <MatIcon
      {...props}
      name={"library-add"}
      size={30}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const Products = (props) => {
  return (
    <AntDesign
      {...props}
      name={"appstore1"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const TrashIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Ionicon name={"ios-trash"} size={props.size} color={props.color} />
    </TouchableOpacity>
  );
};

export const TrasherIcon = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "rgb(210, 230, 255)" : "white" },
        ...props.style,
      ]}
      hitSlop={{ bottom: 30, left: 20, right: 20, top: 20 }}
    >
      <Ionicon name={"ios-trash"} size={props.size} color={props.color} />
    </Pressable>
  );
};

export const BackIcon = (props) => {
  if (isApple) {
    return (
      <MatIcon name={"arrow-back-ios"} size={25} color={"white"} {...props} />
    );
  } else {
    return <MatIcon name={"arrow-back"} size={25} color={"white"} {...props} />;
  }
};

export const Explore = (props) => {
  return (
    <MatIcon
      {...props}
      name={"explore"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const Home = (props) => {
  return (
    <MatIcon
      {...props}
      name={"home"}
      size={props.size}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export const LoginIcon = (props) => {
  return <MatCom name={"login-variant"} {...props} />;
};

export const LogoutIcon = (props) => {
  return <MatCom name={"logout-variant"} {...props} />;
};

export const EditIcon = (props) => {
  return <MatCom name={"circle-edit-outline"} {...props} />;
};

export const DeleteIcon = (props) => {
  return <MatCom name={"delete-circle-outline"} {...props} />;
};

export const MyRequestIcon = (props) => {
  return <MatCom name={"account-clock"} {...props} />;
};

export const ApproveRequestIcon = (props) => {
  return <MatCom name={"clock-check"} {...props} />;
};

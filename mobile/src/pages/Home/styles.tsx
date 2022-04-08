import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #121015;
  padding: 20px 25px 5px 25px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

export const Greetings = styled.Text`
  margin-top: 5px;
  color: #ffffff55;
  font-size: 12px;
`;

export const FlatListTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;

  margin-top: 30px;
`;

export const FlatListEmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FlatListEmptyIcon = styled.Text`
  color: #fff;
  font-size: 17px;
  padding: 5px;
  text-align: center;
`;

export const FlatListEmptyText = styled.Text`
  color: #fff;
  font-size: 17px;
  padding: 5px;
  text-align: center;
`;

export const FlatListItem = styled.TouchableOpacity`
  padding: 10px 15px 10px 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: #1f1e25;
`;

export const FlatListItemTitle = styled.Text`
  color: #fff;
  font-size: 17px;
`;

export const FlatListItemDate = styled.Text`
  color: #ffffff55;
  font-size: 10px;
`;

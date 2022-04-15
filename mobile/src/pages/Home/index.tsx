import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  isYesterday,
  isToday,
  format,
  getUnixTime,
  fromUnixTime,
} from "date-fns";

import {
  addSkillToAddress,
  getAddedSkillsFromAddress,
  Skill,
} from "../../Contracts/MySkill";

import Button from "../../components/Button";
import Input from "../../components/Input";

import {
  Container,
  Title,
  Greetings,
  FlatListTitle,
  FlatListEmptyContainer,
  FlatListEmptyIcon,
  FlatListEmptyText,
  FlatListItem,
  FlatListItemTitle,
  FlatListItemDate,
} from "./styles";

export const Home: React.FC = () => {
  const [skills, addSkill] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [skill, setSkill] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<string | null>(null);

  const handleAdd = useCallback(async () => {
    const tx = await addSkillToAddress(
      "0x034dfDFE5A9259931ed68fA03C7448F74C105586",
      skill,
      getUnixTime(new Date())
    );

    const skills = setSkill(null);
  }, [skill, skills]);

  const formatDate = useCallback((timestamp: number) => {
    const date = fromUnixTime(timestamp);

    if (isYesterday(date)) {
      return "Added Yesterday";
    }
    if (isToday(date)) {
      return "Added Today";
    }
    return `Added in ${format(date, "dd/MM/yyyy")}`;
  }, []);

  useEffect(() => {
    setLoading(true);

    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good night");
    }

    const fillSkills = async () => {
      const addedSkills = await getAddedSkillsFromAddress(
        "0x034dfDFE5A9259931ed68fA03C7448F74C105586"
      );

      addSkill(addedSkills);
      setLoading(false);
    };

    fillSkills();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Title>Welcome, Guilherme</Title>
        <Greetings>{greeting}</Greetings>
        <Input
          value={skill}
          onChangeText={setSkill}
          onSubmitEditing={handleAdd}
          placeholder="Add your skill here :)"
          placeholderTextColor="#555"
        />
        <Button text="Add" activeOpacity={0.7} onPress={handleAdd} />
        <FlatListTitle>My Skills</FlatListTitle>
        <FlatList<Skill>
          style={{ marginTop: 20 }}
          data={skills}
          keyExtractor={(item) => item.timestamp.toString()}
          ListEmptyComponent={() => (
            <FlatListEmptyContainer>
              <FlatListEmptyIcon>¯\_(ツ)_/¯</FlatListEmptyIcon>
              <FlatListEmptyText>
                You don't have any skill yet
              </FlatListEmptyText>
            </FlatListEmptyContainer>
          )}
          renderItem={({ item }) => (
            <FlatListItem activeOpacity={0.7} onLongPress={() => {}}>
              <FlatListItemTitle>{item.skill}</FlatListItemTitle>
              <FlatListItemDate>{formatDate(item.timestamp)}</FlatListItemDate>
            </FlatListItem>
          )}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { isYesterday, isToday, format, getUnixTime } from "date-fns";

import { mySkillContract, addSkillToAddress } from "../../Contracts/MySkill";

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

interface ISkill {
  id: number;
  title: string;
  date: Date;
}

export const Home: React.FC = () => {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [skill, setSkill] = useState<string | null>(null);
  const [skills, addSkill] = useState<ISkill[]>([]);

  const handleAdd = useCallback(async () => {
    const tx = await addSkillToAddress(
      "0x034dfDFE5A9259931ed68fA03C7448F74C105586",
      skill,
      getUnixTime(new Date())
    );

    console.log(tx);

    const skills = setSkill(null);
  }, [skill, skills]);

  const handleRemove = useCallback(
    (id: number) => {
      addSkill((prev) => prev.filter((item) => item.id != id));
    },
    [skills]
  );

  const formatDate = useCallback((date: Date) => {
    if (isYesterday(date)) {
      return "Added Yesterday";
    }
    if (isToday(date)) {
      return "Added Today";
    }
    return `Added in ${format(date, "dd/MM/yyyy")}`;
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good night");
    }

    const pastEvents = async () => {
      const updatedSkillsEventFilter = mySkillContract.filters.UpdatedSkills();
      const events = await mySkillContract.queryFilter(
        updatedSkillsEventFilter
      );
      console.log(events);
    };

    pastEvents();
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
        <FlatList<ISkill>
          style={{ marginTop: 20 }}
          data={skills}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <FlatListEmptyContainer>
              <FlatListEmptyIcon>¯\_(ツ)_/¯</FlatListEmptyIcon>
              <FlatListEmptyText>
                You don't have any skill yet
              </FlatListEmptyText>
            </FlatListEmptyContainer>
          )}
          renderItem={({ item }) => (
            <FlatListItem
              activeOpacity={0.7}
              onLongPress={() => {
                handleRemove(item.id);
              }}
            >
              <FlatListItemTitle>{item.title}</FlatListItemTitle>
              <FlatListItemDate>{formatDate(item.date)}</FlatListItemDate>
            </FlatListItem>
          )}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

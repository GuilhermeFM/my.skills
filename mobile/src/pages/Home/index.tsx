import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import { isYesterday, isToday, format } from "date-fns";

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

  const handleAdd = useCallback(() => {
    if (!skill) {
      return;
    }

    const exists = skills.find((s) => s.title == skill);

    if (exists) {
      return;
    }

    addSkill((prev) => {
      const nextId = prev.length > 0 ? prev[0].id + 1 : 1;
      return [{ id: nextId, date: new Date(), title: skill }, ...prev];
    });

    setSkill(null);
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
        <Button activeOpacity={0.7} onPress={handleAdd}>
          Add
        </Button>
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

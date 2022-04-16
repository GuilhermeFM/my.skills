import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  isYesterday,
  isToday,
  format,
  getUnixTime,
  fromUnixTime,
} from "date-fns";

import SkillContract, { Skill } from "../../Contracts/MySkill";
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
  const [skill, setSkill] = useState<string | null>(null);

  const handleAdd = useCallback(() => {
    if (!skill) {
      return;
    }

    const timestamp = getUnixTime(new Date());

    SkillContract.addSkill({
      skill,
      timestamp,
    });

    addSkill((prev) => [...prev, { name: skill, timestamp, pending: true }]);
    setSkill(null);
  }, [skill, skills]);

  const formatGreetings = useCallback(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good night";
    }
  }, []);

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
    const fillSkillList = async () => {
      const addedSkills = await SkillContract.getAllSkill();
      addSkill((prev) => [...prev, ...addedSkills]);
    };

    fillSkillList();

    SkillContract.onSkillAdded((_, skill, timestamp) => {
      addSkill((prev) =>
        prev.map((pSkill) =>
          pSkill.name === skill && pSkill.timestamp === timestamp
            ? { ...pSkill, pending: false }
            : pSkill
        )
      );
    });

    return () => {
      SkillContract.dettacheOnSkillAdded();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <Title>Welcome, Guilherme</Title>
        <Greetings>{formatGreetings()}</Greetings>
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
              <FlatListItemTitle>{item.name}</FlatListItemTitle>
              <FlatListItemDate>
                {item.pending ? "Pending..." : formatDate(item.timestamp)}
              </FlatListItemDate>
            </FlatListItem>
          )}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

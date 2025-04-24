import { router } from "expo-router";
import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { StepProgress } from "@/components/common";
import { CustomText } from "@/components/custom";

import { PATH, TOKEN_NAME } from "@/constants";
import { setItem } from "@/utils/store-actions";

export default function HomeScreen() {
  const [step, setStep] = useState(1);

  const handleBack = useCallback(() => setStep((curr) => curr - 1), []);

  const handleNext = useCallback(async () => {
    if (step === 3) await handleSkip();
    else setStep((curr) => curr + 1);
  }, [step]);

  const handleSkip = useCallback(async () => {
    await setItem(TOKEN_NAME.HAS_ONBOARDING, "true");
    router.push(PATH.LOGIN);
  }, []);

  const contents = useMemo(
    () => [
      {
        image: require("@/assets/images/onboarding/onboarding1.png"),
        title: "Expense Tracking Made Easy",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, itaque facere laborum hic impedit saepe ipsa.",
      },
      {
        image: require("@/assets/images/onboarding/onboarding2.png"),
        title: "Smart Budgeting For Your Goals",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, itaque facere laborum hic impedit saepe ipsa.",
      },
      {
        image: require("@/assets/images/onboarding/onboarding3.png"),
        title: "Insight That Empower You",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, itaque facere laborum hic impedit saepe ipsa.",
      },
    ],
    []
  );

  return (
    <View style={styles.onboardingPage}>
      <TouchableOpacity style={styles.skip} onPress={handleSkip}>
        <CustomText type="h6" status="label">
          Skip
        </CustomText>
      </TouchableOpacity>

      <View style={styles.main}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={contents[step - 1].image}
        />
        <CustomText type="h1" style={{ textAlign: "center" }}>
          {contents[step - 1].title}
        </CustomText>
        <CustomText status="label" style={styles.content}>
          {contents[step - 1].content}
        </CustomText>
        <StepProgress numSteps={3} current={step} />
      </View>
      <View style={styles.buttons}>
        {step === 1 ? <View /> : <BackButton onPress={handleBack} />}
        <NextButton onPress={handleNext} />
      </View>
    </View>
  );
}

type PagingButtonProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const PagingButton = ({ children, style, onPress }: PagingButtonProps) => (
  <TouchableOpacity style={style} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <PagingButton style={styles.backButton} onPress={onPress}>
    <Feather name="chevron-left" color="#666" size={24} />
  </PagingButton>
);

const NextButton = ({ onPress }: { onPress: () => void }) => (
  <PagingButton style={styles.nextButton} onPress={onPress}>
    <Feather name="chevron-right" color="#fff" size={24} />
  </PagingButton>
);

const styles = StyleSheet.create({
  onboardingPage: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  skip: { alignSelf: "flex-end" },
  main: {
    gap: 40,
    alignItems: "center",
  },
  image: { width: 200, height: 200 },
  content: {
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    paddingVertical: 10,
    paddingRight: 11,
    paddingLeft: 9,
    borderRadius: 30,
    backgroundColor: "#eee",
  },
  nextButton: {
    paddingVertical: 10,
    paddingRight: 9,
    paddingLeft: 11,
    borderRadius: 30,
    backgroundColor: "#33aaff",
  },
});

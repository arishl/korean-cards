import koreanalphabet from './Korean/Alphabet.json'
import { useState } from 'react';
import { Button, ButtonGroup,  Text, Box } from '@chakra-ui/react';
import './home-page.css'

function HomePage() {

  const [options, setOptions] = useState(generateOptions());

  const speak = (text, language) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language; // Set language to English
    window.speechSynthesis.speak(speech);
  };

  function generateOptions() {
    const randomIndex = Math.floor(Math.random() * koreanalphabet.characters.length);
    const korean = koreanalphabet.characters[randomIndex].korean;
    const correctEnglish = koreanalphabet.characters[randomIndex].english;
    const allEnglishOptions = koreanalphabet.characters.map(item => item.english);
    const incorrectEnglish = allEnglishOptions
      .filter(option => option !== correctEnglish)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const shuffledOptions = [correctEnglish, ...incorrectEnglish].sort(() => 0.5 - Math.random());
    return { korean, options: shuffledOptions };
  }
  function handleOptionClick(selectedOption) {
    const isCorrect = selectedOption === options.options[0];
    if (isCorrect) {
      setOptions(generateOptions());
      speak(options.korean, "ko-KR")
    } else {
      speak("부정확한", "ko-KR")
    }
  }
  function handleCharacterClick(selectedOption) {
      speak(selectedOption, "ko-KR")
  }
  return (
    <Box alignItems="center"  justifyContent="center" display="flex" flexDirection="column">
        <Text mt = {-300}  fontSize="9xl">한글</Text>
        <Text mt = {-6} size = "small" fontSize="1xl" mb={4}>The Korean Alphabet</Text>
        <Button  onClick={() => handleCharacterClick(options.korean)} size = "xxl" fontSize="9xl" mb={4}>{options.korean}</Button>
        <ButtonGroup>
          {options.options.map(option => (
            <Button
              key={option}
              onClick={() => handleOptionClick(option)}
              size="large"
              fontSize="4xl"
              py={4}
              px={5}
              bg="pink"
              color="black"
              variant="outline"
              borderColor="pink"
              mr={2}
              ml = {2}
              mb={2}
            >
              {option}
            </Button>
          ))}
        </ButtonGroup>
    </Box>
  )
}

export default HomePage

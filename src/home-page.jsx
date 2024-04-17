import koreanalphabet from './Korean/Alphabet.json'
import koreansentences from './Korean/sentences-1.json'
import koreanwords from './Korean/words.json'
import { useState } from 'react';
import { Button, ButtonGroup,  Text, Box } from '@chakra-ui/react';
import './home-page.css'
import Cookies from 'js-cookie';





function HomePage() {
  if (Cookies.get("level") == null){
    Cookies.set("level",0);
  }
  const [level, setLevel] = useState(parseInt(Cookies.get("level")));
  const [options, setOptions] = useState(generateOptions());
  
  
  function generateOptions() {
    const randomIndex = Math.floor(Math.random() * koreanalphabet.characters.length);
    let korean = "";
    let correctEnglish = "";
    let allEnglishOptions = "";
    if (level  >= 1000){
      korean = koreansentences.sentences[randomIndex].korean;
      correctEnglish = koreansentences.sentences[randomIndex].english;
      allEnglishOptions = koreansentences.sentences.map(item => item.english);
    }
    else if (level >=20){
      korean = koreanwords.words[randomIndex].korean;
      correctEnglish = koreanwords.words[randomIndex].english;
      allEnglishOptions = koreanwords.words.map(item => item.english);
    }else{
      korean = koreanalphabet.characters[randomIndex].korean;
      correctEnglish = koreanalphabet.characters[randomIndex].english;
      allEnglishOptions = koreanalphabet.characters.map(item => item.english);
    }
    
    const incorrectEnglish = allEnglishOptions
      .filter(option => option !== correctEnglish)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const shuffledOptions = [correctEnglish, ...incorrectEnglish].sort(() => 0.5 - Math.random());
    return { korean, correctEnglish, options: shuffledOptions };
  }
  const speak = (text, language) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language; // Set language to English
    window.speechSynthesis.speak(speech);
  };

  function handleOptionClick(selectedOption) {
    const isCorrect = selectedOption === options.correctEnglish;
    if (isCorrect) {
      setOptions(generateOptions());
      setLevel(level + 1)
      Cookies.set("level",level)
      speak(options.korean, "ko-KR")
    } else {
      if (level >= 1){
        setLevel(level - 1)
      }
      speak("부정확한", "ko-KR")
    }
  }
  function handleCharacterClick(selectedOption) {
      speak(selectedOption, "ko-KR")
  }
  return (
    <Box alignItems="center"  justifyContent="center" display="flex" flexDirection="column">
        <Text mt = {-300}  fontSize="9xl">한국어를 배우다</Text>
        <Text mt = {-6} size = "small" fontSize="1xl" mb={4}>Learn Korean</Text>
        <Text mt = {-6} size = "small" fontSize="1xl" mb={4}>{level}</Text>
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

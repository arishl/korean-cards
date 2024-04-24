import level_0 from './Korean/level_0.json'
import level_1 from './Korean/level_1.json'
import level_2 from './Korean/level_2.json'
import { useState } from 'react';
import { Button, ButtonGroup,  Text, Box } from '@chakra-ui/react';
import './home-page.css'
import Cookies from 'js-cookie';

const levelData = {
  0: level_0,
  1: level_1,
  2: level_2,
};



function HomePage() {
  if (Cookies.get("level") == null){
    Cookies.set("level",0);
  }
  if (Cookies.get("xp")==null){
    Cookies.set("xp",0)
  }
  const [xp,setXP] = useState(parseInt(Cookies.get("xp")));
  const [level, setLevel] = useState(parseInt(Cookies.get("level")));
  const [options, setOptions] = useState(generateOptions());
  
  
  function generateOptions() {
    if (xp >= 100){
      setLevel(level+1)
      Cookies.set("level", level);
      setXP(0);
      Cookies.set("xp",0);
    }
    const randomIndex = Math.floor(Math.random() * levelData[level].items.length);
    let korean = "";
    let correctEnglish = "";
    let allEnglishOptions = "";
    korean = levelData[level].items[randomIndex].korean;
    correctEnglish = levelData[level].items[randomIndex].english;
    allEnglishOptions = levelData[level].items.map(item => item.english);
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
      setXP(xp + 1)
      Cookies.set("level",level)
      speak(options.korean, "ko-KR")
    } else {
      if (xp >= 1){
        setXP(xp - 1)
      }
      speak("부정확한", "ko-KR")
    }
  }
  function handleCharacterClick(selectedOption) {
      speak(selectedOption, "ko-KR")
  }
  const TopButton = () => {

    return (
      <Box textAlign="center" pt={10}>
        <Button
          
          bg="white"
          position="relative"
          _hover={{ bg: "white" }}
          onClick={() => handleCharacterClick(options.korean)} size = "xxl" fontSize="9xl" 
          mb={10}
          mt = {-4}
        >
          {options.korean}
        </Button>
      </Box>
    );
  };
  
  return (
    <Box alignItems="center"  justifyContent="center" display="flex" flexDirection="column">
        <Button padding = {2} _hover="#e56969" bg="#e56969" size="large" mt = {-100}  fontSize="9xl">한국어를 배우다</Button>
        
        <Box bg = "grey" size="large" mt = {4} _hover="grey" pt = {1} pb = {1} pl = {50} pr = {50} >
        <Box  alignItems="center"  justifyContent="center" display="flex" flexDirection="column">
        <TopButton/>
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
        </Box>
        <Button pl = {50} pr = {50} bg = {level > 0 ? "green" : "red"}  mt = {3}>
          Level 1
        </Button>
        <Button pl = {50} pr = {50} bg = {level > 1 ? "green" : "red"}  mt = {3}>
          Level 2
        </Button>
        <Button pl = {50} pr = {50} bg = {level > 2  ? "green" : "red"}  mt = {3}>
          Level 3
        </Button>
        <Button pl = {50} pr = {50} bg = {level > 3 ? "green" : "red"}  mt = {3}>
          Level 4
        </Button>
    </Box>
  )
}

export default HomePage

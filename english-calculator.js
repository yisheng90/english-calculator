var string1 = 'sixty times one'

var match = {
  'fif': 5,
  'twen': 2,
  'thir': 3,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'night': 9,
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'minus': 'minus',
  'plus': 'plus',
  'times': 'times'

}


//Convert calculated result back to string
function convertNumToString (count) {
  var count = count.toString()
  var string = ''
//  console.log(count[0])
  var i = 0
  while (i < count.length) {
    if (count.length > 1) {
      // console.log(i === 0)
      if (count[0] !== '1' && i === 0) {
        string = string + matchNum(parseInt(count[0])) + 'ty'
        if (count[1] === '0') {
          i += 2
        } else {
          i += 1
        }
      } else if (count[0] === '1' && i === 0) {
        if (count[1] >= '3' && count[1] <= '9') {
          string = string + matchNum(parseInt(count[1])) + 'teen'
        } else {
          string = matchNum(parseInt(count))
        }
        i += 2
      } else {
        string = string + ' ' + matchNum(parseInt(count[i]))
        i += 1
      }
    } else {
      string = matchNum(parseInt(count))
      i += 1
    }
  }
  return string
}


//match the calculated result with the object
function matchNum (num) {
  for (var key in match) {
    if (match[key] === num) {
      return key
    }
  }
}


//Convert string to number
function matchString (num) {
  if (num.includes('teen')) {
    num = num.replace(/teen/, '')
    return match[num] + 10
  } else if (num.includes('ty')) {
    num = num.replace('ty', '')
    return match[num] * 10
  } else {
    return match[num]
  }
}

//Main function
function stringCalc (string) {
  var arr = string.split(' ')
//  console.log(arr)
  var count = 0
  var i = 0
  while (i < arr.length) {
    if (arr[i] === 'minus') {
      count -= matchString(arr[i + 1])
      i += 2
    } else if (arr[i] === 'plus') {
      count += matchString(arr[i + 1])
      i += 2
    } else if (arr[i] === 'times') {
      count *= matchString(arr[i + 1])
      i += 2
    } else {
      count += matchString(arr[i])

      i += 1
    }
  }
  string = string + ' equal to ' + convertNumToString(count)
}

stringCalc(string1)

/*
Example var input = "sixty plus one"
1. When I call my main function stringCalc(input), I turn it into array. arr = ['sixty', 'plus', 'one']
2. Now pass the element in the object through thw while loop:
  in the while loop,
    i. arr[0] === 'sixty'. it is not 'minus', 'plus' or 'times'. so it will pass line 102
        count += matchString(arr[i])
        In matchSctring(arr[i]) function, I check if arr[i] includes 'teen' or 'ty'. In this case, 'sixty' includes 'ty'.
        So my function remove the 'ty' and look for 'six' in the macth object. After that, my return 6*10 = 60
    ii. arr[2] === 'plus'. So it will match the next index number and return
        60 + 1
        then increase my i by 2 to avoid double count
3. Now I got my answer 61. I need to change it back to string. This is done by convertNumToString (count)
   in that function, we need to change the numerical value to string (if not we can't access it individually).
   then I check if my answer a single digit or double digit. If it is sigle digit, I will just serch through the match object. If not,

   function convertNumToString (count) {
     var count = count.toString()
     var string = ''

     var i = 0
     while (i < count.length) {
       if (count.length > 1) {

         if (count[0] !== '1' && i === 0) { --- > CHECK IF MY ANSWER IS GREATER THAN 19. ONLY CHECK DURING THE FIRST DIGIT
           string = string + matchNum(parseInt(count[0])) + 'ty' ----> CONVERT MY STRING BACK TO NUMBER AND LOOK FOR THE WORD STRING IN THE MATCH OBJECT AND ADD 'TY'
           if (count[1] === '0') { ----> IF THE SECOND DIGIT IS 0, i+2
             i += 2
           } else {
             i += 1
           }
         } else if (count[0] === '1' && i === 0) { ---> IF THE FIRST DIGIT IS 1, THAT MEAN'S MY ANSWER IS WITHIN 10 TO 19
           if (count[1] >= '3' && count[1] <= '9') { ---> IF THE 3<SECOND DIGIT<9
             string = string + matchNum(parseInt(count[1])) + 'teen' ---> SEARCH IN THE MATCH OBJECT AND ADD 'TEEN'
           } else {
             string = matchNum(parseInt(count)) ---> IF NOT JUST SEARCH IN THE MATCH OBJECT
           }
           i += 2
         } else {
           string = string + ' ' + matchNum(parseInt(count[i]))
           i += 1
         }
       } else {
         string = matchNum(parseInt(count))
         i += 1
       }
     }
     return string
   }
*/

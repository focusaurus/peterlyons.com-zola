const commaRegex = /,/g;
const dateRegex = /\b\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})\b/g;

module.exports = {dateRegex,commaRegex};
/*
import Regex
import String


commaRe : Regex.Regex
commaRe =
    Maybe.withDefault Regex.never <|
        Regex.fromString ","


dateRe : Regex.Regex
dateRe =
    Maybe.withDefault Regex.never <|
        Regex.fromString "\\b\\d{1,2}\\/\\d{1,2}\\/(\\d{2}|\\d{4})\\b"


numberRe : Regex.Regex
numberRe =
    Maybe.withDefault Regex.never <|
        Regex.fromString "\\b-?(\\d{1,3}(,\\d{3})*|\\d+)(\\.\\d+)?\\b"


parseFloat : Regex.Match -> Maybe Float
parseFloat match =
    String.toFloat match.match


parseNumbers : String -> List Float
parseNumbers rawText =
    let
        noDates =
            Regex.replace dateRe (always "") rawText

        noCommas =
            Regex.replace commaRe (always "") noDates
    in
    Regex.find numberRe noCommas
 
*/

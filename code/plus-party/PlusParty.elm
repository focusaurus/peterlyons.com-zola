module PlusParty exposing (main)

import Browser
import Core
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Encode as JE
import Process
import Round
import Task
import Time


type Msg
    = ChangeInput String
    | CopyTotal Bool


type alias Model =
    { text : String
    , copying : Bool
    }


type alias Party =
    { numbers : List String
    , totalFixed : String
    }


initialText : String
initialText =
    """Paste some numbers in here and we'll total them up even if there's some words and junk, too.

For example: 1 plus 2 plus 2 plus 1
"""


fix2 : Float -> String
fix2 =
    Round.round 2


getParty : Model -> Party
getParty model =
    let
        numbers =
            Core.parseNumbers model.text

        total =
            List.sum numbers
    in
    { numbers = List.map String.fromFloat numbers
    , totalFixed = fix2 total
    }


item : String -> Html msg
item fixed =
    li [] [ text fixed ]


later : msg -> Cmd msg
later msg =
    Process.sleep 2000 |> Task.perform (\_ -> msg)



-- http://stackoverflow.com/a/41495885/266795


buttonText : Bool -> String
buttonText copying =
    case copying of
        True ->
            "Copied!"

        False ->
            "Copy Total 📋"


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        ChangeInput newText ->
            ( { model | text = newText }, Cmd.none )

        CopyTotal state ->
            ( { model | copying = state }
            , case state of
                True ->
                    later (CopyTotal False)

                False ->
                    Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> Html Msg
view model =
    let
        party =
            getParty model
    in
    div [ class "plus-party" ]
        [ textarea [ onInput ChangeInput ] [ text model.text ]
        , button
            [ id "copy-total"
            , onClick (CopyTotal True)
            , attribute "data-clipboard-text" party.totalFixed
            ]
            [ text (buttonText model.copying) ]
        , ul [ class "clear" ] (List.map item party.numbers)
        , div [ class "total" ]
            [ text party.totalFixed
            ]
        ]


init : () -> ( Model, Cmd Msg )
init _ =
    ( { text = initialText, copying = False }
    , Cmd.none
    )


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

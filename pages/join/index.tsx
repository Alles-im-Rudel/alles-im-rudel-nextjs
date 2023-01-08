import React from 'react';
import tw from 'twin.macro';
import Divider from '../../components/Elements/Divider';
import Text from '../../components/Layout/Text';
import StepWhoAreYou from "./steps/StepWhoAreYou";
import StepWhereAreYou from "./steps/StepWhereAreYou";
import Stepper from '../../components/Elements/Stepper';
import iStep from "../../components/Elements/Stepper/iStep";

const Container = tw.div`
    h-full
    w-full
    flex
    flex-col
    justify-center
    items-center
`;


const ContentContainer = tw.div`
    max-w-screen-lg
 `;
const Join = () => {

    const StepOne: iStep = {
        headline: "Wer bist du?",
        element: <StepWhoAreYou />,
        nextStep: {
            text: "Weiter",
            action: () => console.log("Wer bist du?")
        }
    }

    const StepTwo: iStep = {
        headline: "Wo Wohnst du?",
        element: <StepWhereAreYou />,
        nextStep: {
            text: "Weiter",
            action: () => console.log("Wer bist du?")
        },
        previousStep: {
            text: "Zurück",
            action: () => console.log("Wer bist du?")
        }
    }

    const StepThree: iStep = {
        headline: "Bei welchen Sparten möchtest du dabei sein? ",
        element: <StepWhereAreYou />,
        nextStep: {
            text: "Weiter",
            action: () => console.log("Wer bist du?")
        },
        previousStep: {
            text: "Zurück",
            action: () => console.log("Wer bist du?")
        }
    }

    return (
        <Container>
            <Divider title="Interesse?" />
            <ContentContainer>
                <Text>
                    Wir konnten dein Interesse wecken und du möchtest dem Verein beitreten? Dann fülle einfach diesen
                    Beitrittsantrag aus!
                    Im nächsten Schritt prüfen wir deinen Beitrittswunsch und teilen dir im Anschluss mit, ob du dich in
                    Zukunft als stolzer Teil des Rudels bezeichnen kannst.
                </Text>
                <Stepper
                    steps={[
                        StepOne, StepTwo, StepThree
                    ]}
                />
            </ContentContainer>
        </Container>
    );
};

export default Join;

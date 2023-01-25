import React, {useEffect} from 'react';
import tw from 'twin.macro';
import Divider from '../../components/Elements/Divider';
import _text from '../../components/Layout/Text';
import StepWhoAreYou from "../../components/Join/steps/StepWhoAreYou";
import StepWhereAreYou from "../../components/Join/steps/StepWhereAreYou";
import Stepper from '../../components/Elements/Stepper';
import iStep from "../../components/Elements/Stepper/iStep";
import StepBranchSelect from "../../components/Join/steps/StepBranchSelect";
import useJoinStore from "../../lib/Join/store";
import shallow from "zustand/shallow";
import {iBackendBranche} from "../../Interfaces/iBranche";
import StepHowToPay from "../../components/Join/steps/StepHowToPay";
import StepChoosePassword from "../../components/Join/steps/StepChoosePassword";
import StepOverview from "../../components/Join/steps/StepOverview";
import {apiFetch, Endpoint} from "../../lib/api";

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

const Text = tw(_text)`
    my-10
`;

interface iJoin {
    branches: iBackendBranche[]
}
const Join = ({branches}: iJoin) => {

    const [
        setBranches,
    ] = useJoinStore((state) => [
        state.setBranches,
    ], shallow);


    useEffect(() => {
        setBranches(branches)
    }, [branches, setBranches])

    const StepOne: iStep = {
        headline: "Wer bist du?",
        element: <StepWhoAreYou />,
    }

    const StepTwo: iStep = {
        headline: "Wo Wohnst du?",
        element: <StepWhereAreYou />,
    }

    const StepThree: iStep = {
        headline: "Bei welchen Sparten möchtest du dabei sein?",
        element: <StepBranchSelect />,
    }

    const StepFour: iStep = {
        headline: "Wie möchtest du deinen Mitgliedsbeitrag zahlen?",
        element: <StepHowToPay />
    }

    const StepFive: iStep = {
        headline: "Welches Password möchtest du benutzen?",
        element: <StepChoosePassword />
    }

    const StepSix: iStep = {
        headline: "Abschließen",
        element: <StepOverview />
    }

    return (
        <Container>
            <Divider>
                Interesse?
            </Divider>
            <ContentContainer>
                <Text>
                    Wir konnten dein Interesse wecken und du möchtest dem Verein beitreten? Dann fülle einfach diesen
                    Beitrittsantrag aus!
                    Im nächsten Schritt prüfen wir deinen Beitrittswunsch und teilen dir im Anschluss mit, ob du dich in
                    Zukunft als stolzer Teil des Rudels bezeichnen kannst.
                </Text>
                <Stepper
                    steps={[
                        StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix
                    ]}
                />
            </ContentContainer>
        </Container>
    );
};

export async function getStaticProps() {
    const responseBranches = await apiFetch("/branches", Endpoint.backend);
    const branches = await responseBranches;

    return {
        props: {
            branches: branches.data,
        },
    };
}

export default Join;

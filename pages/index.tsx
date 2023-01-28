import tw from "twin.macro";
import React from "react";
import _image from "next/image";
import Divider from "../components/Elements/Divider";
import IPost from "../Interfaces/iPost";
import PostsPreviewList from "../components/Elements/Post/PostsPreviewList";
import Head from "next/head";
import BoardOfDirectorList from "../components/Elements/BoardOfDirectors/BoardOfDirecortList";
import iBoardOfDirecor from "../Interfaces/iBoardOfDirecor";
import iPartner from "../Interfaces/iPartner";
import PartnerList from "../components/Elements/Partner/PartnerList";
import iBranche from "../Interfaces/iBranche";
import BranchList from "../components/Elements/Branch/BranchList";
import {apiFetch, Endpoint} from "../lib/api";

const Container = tw.div`
    
`;

const Header = tw.div`
    relative
    h-[50vh]
    overflow-hidden
    flex
    justify-center
    items-center
`;

const Image = tw(_image)`
      absolute
      z-1
      mx-auto
      w-auto
      h-auto
      max-w-[90%]
      max-h-[90%]
`;

const BackgroundImage = tw(_image)`
    absolute
    w-full
    h-full
    z-0
    object-cover
`;

const ContentWrapper = tw.div`
    bg-white
    flex
    flex-col
    justify-center
    items-center
`;

const Content = tw.div`
    flex
    flex-col
    gap-5
    min-h-[50vh]
    px-4
    lg:px-0
    lg:max-w-screen-lg
`;

const Headline = tw.p`
    mt-5
    text-center
    text-h-3
    lg:mt-10
    lg:text-headline-lg
`;

const Text = tw.p`
    text-center
`;

type IndexProps = {
    posts: IPost[];
    boardOfDirectors: iBoardOfDirecor[]
    partners: iPartner[]
    branches: iBranche[]
}

function Index({posts, boardOfDirectors, partners, branches}: IndexProps) {
    const structuredData = {
        '@context': 'http://schema.org/',
        '@type': 'Organization',
        'name': 'Alles im Rudel e.V.',
        'description': 'Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports',
        'telephone': '+49 176 55234699',
        'email': 'allesimrudel@gmail.com',
        'logo': 'https://www.allesimrudel.de/assets/logos/logo-slim.png',
        'url': 'https://www.allesimrudel.de',
        'sameAs': 'https://www.airsoft-verzeichnis.de/index.php?status=team&teamnummer=011712',
        'image': [
            'https://www.allesimrudel.de/assets/backgrounds/default.jpg',
            'https://www.allesimrudel.de/assets/logos/logo-slim.png'
        ],
        'areaServed': 'Deutschland',
        'foundingDate': '2021-05-28',
        'founders': [
            {
                '@type': 'person',
                'name': 'Silas Beckmann',
                'birthDate': '1998-04-20',
                'gender': 'Male',
                'email': 'silas_beckmann@t-online.de'
            },
            {
                '@type': 'person',
                'name': 'Timm Vollborn',
                'birthDate': '1999-01-30',
                'gender': 'Male',
                'email': 'timm.vollborn@outlook.de'
            },
            {
                '@type': 'person',
                'name': 'Nick Nickels',
                'birthDate': '1998-12-28',
                'gender': 'Male',
                'email': 'Nick.Nickels.Privat@gmail.com'
            }
        ],
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Norderstraße 23',
            'addressLocality': 'Elmshorn',
            'addressRegion': 'PI',
            'postalCode': '25335',
            'addressCountry': 'DE'
        },
        'sponsor': [
            {
                '@type': 'Organization',
                'name': 'Begadi GmbH',
                'description': 'BEGADI Taktische Bekleidung, Airsoftwaffen, Outdoor und Zubehör - www.begadi.com.',
                'email': 'support@begadi.com',
                'logo': 'https://www.begadi.com/skin/frontend/begadi/default/images/logo.png',
                'url': 'https://www.begadi.com/',
            },
            {
                '@type': 'Organization',
                'name': 'B.A.D. Agency Airsoft GmbH',
                'description': 'Herzlich Willkommen auf dem Online-Shop der B.A.D. Agency Airsoft GmbH. Wir freuen uns sehr, dass Du den Weg zu uns gefunden hast.',
                'email': 'hq@badagency.de',
                'logo': 'https://badagency.de/media/image/ba/ea/5b/badagency-shop-logo-main.png',
                'url': 'https://badagency.de//',
            },
            {
                '@type': 'Organization',
                'name': 'Autoreparatur Henry Krohn GmbH',
                'description': 'Vereinbaren Sie jetzt einen Werkstatt-Termin bei fachmännischem Kfz-Service für alle Fahrzeug-Marken! Bei uns finden Sie alles, was Ihr Auto braucht',
                'email': 'Henry@HenryKrohn.de',
                'logo': 'https://www.autoreparatur-krohn.de/fileadmin/img/MH_Logo_4C_rgb.png',
                'url': 'https://www.autoreparatur-krohn.de/',
            },
        ]
    };
    
    return (
        <>
            <Head>
                <title>Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
                />
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}} />
            </Head>
            <Container>
                <Header>
                    <BackgroundImage
                        priority
                        src="/backgrounds/default.webp"
                        alt="Hintergrund Alles im Rudel e.V."
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1536px) 100vw"
                    />
                    <Image
                        priority
                        src="/logos/logo-grey-slim.png"
                        alt="Logo Alles im Rudel e.V."
                        width={1000}
                        height={550}
                    />
                </Header>
                <ContentWrapper>
                    <Content>
                        <Headline>Willkommen</Headline>
                        <Text>bei Alles im Rudel e.V.</Text>
                        <Text>
                            Wir sind ein stetig wachsender Verein mit Sitz in Elmshorn, dessen Zweck es ist, sich für
                            den
                            Erhalt
                            & die Förderung der sozialen Einheit „Alles im Rudel“ einzusetzen, zu welcher insbesondere
                            unsere
                            Vereinsmitglieder gehören.
                            Dies geschieht vornehmlich durch einen regelmäßigen sozialen Austausch unserer
                            Vereinsmitglieder,
                            welcher grundsätzlich in den unterschiedlichsten Formen erfolgen kann.
                        </Text>
                        <Text>
                            Unter anderem geschieht dies auch in den verschiedenen Vereinssparten, welche nach Bedarf
                            von
                            unseren Vereinsmitgliedern ins Leben gerufen werden können, um so dediziert spezielle
                            Interessen
                            abzubilden.
                        </Text>
                    </Content>
                    <Divider>
                        News
                    </Divider>
                    <PostsPreviewList posts={posts} />
                    <Divider>
                        Der Vorstand
                    </Divider>
                    <BoardOfDirectorList boardOfDirectors={boardOfDirectors} />
                    <Divider>
                        Unsere Partner
                    </Divider>
                    <PartnerList partners={partners} />
                    <Divider>
                        Unsere Sparten
                    </Divider>
                    <BranchList branches={branches} />
                </ContentWrapper>
            </Container>
        </>
    )
}

export async function getStaticProps() {
    const response = await apiFetch("/posts?page=1&perPage=3", Endpoint.backend);
    const posts = await response;

    const responseBoardOfDirectors = await apiFetch("/board-of-directors?populate=image");
    const boardOfDirectors = await responseBoardOfDirectors;

    const responseParners = await apiFetch("/partners?populate=logo");
    const partners = await responseParners;

    const responseBranches = await apiFetch("/branches?populate=image");
    const branches = await responseBranches;

    return {
        props: {
            posts: posts.data,
            boardOfDirectors: boardOfDirectors.data,
            partners: partners.data,
            branches: branches.data,
        },
        revalidate: 30,
    };
}

export default Index

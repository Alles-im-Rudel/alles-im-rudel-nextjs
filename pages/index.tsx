import tw from "twin.macro";
import React, {useEffect, useRef} from "react";
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
import _headline from "../components/Layout/Headline";
import _text from "../components/Layout/Text";

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

const ImageContainer = tw.div`
    z-1
    h-full
    py-small
    px-small
`;

const Image = tw(_image)`
    h-full
    object-contain
`;

const BackgroundImage = tw(_image)`
    absolute
    w-full
    z-0
    lg:h-[unset]
    lg:object-[unset]
    h-screen
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
    px-small
    py-base
    gap-smaller
    max-w-screen-xl
    break-words
`;

const Headline = tw(_headline)`
    text-center
`;

const Text = tw(_text)`
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

    const headerRef = useRef();
    const backgroundRef = useRef();

    const onScroll = () => {
        if (!headerRef.current) return;
        if (!backgroundRef.current) return;
        // @ts-ignore
        const y = headerRef.current.getBoundingClientRect().y;
        if (y >= (window.innerHeight * -1)) {
            // @ts-ignore
            backgroundRef.current.style.top = (headerRef.current.getBoundingClientRect().y * -0.3) - 100 + "px";
        }
    };

    useEffect(() => {
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [headerRef]);

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
                {/* @ts-ignore*/}
                <Header ref={headerRef}>
                    {/* @ts-ignore*/}
                    <BackgroundImage ref={backgroundRef}
                        priority
                        src="/backgrounds/default.jpg"
                        alt="Hintergrund Alles im Rudel e.V."
                        width={1920}
                        height={1080}
                    />
                    <ImageContainer>
                        <Image
                            priority
                            src="/logos/logo-grey-slim.png"
                            alt="Logo Alles im Rudel e.V."
                            width={1000}
                            height={550}
                        />
                    </ImageContainer>
                </Header>
                <ContentWrapper>
                    <Content>
                        <Headline headline={1}>Willkommen bei Alles im Rudel e.V.</Headline>
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

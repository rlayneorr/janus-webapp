import { Panel } from "../entities/Panel";

// constructor of Panel
/*
        panelId: number;
        trainee: HydraTrainee;
        panelist: any;
        interviewDate: any;
        duration: string;
        format: any;
        internet: string;
        panelRound: any;
        recordingConsent: any;
        recordingLink: string;
        status: any;
        associateIntro: string;
        projectOneDescription: string;
        projectTwoDescription: string;
        projectThreeDescription: string;
        communicationSkills: string;
        overall: string;
        feedback: Array<any>;
*/

export const panelsMOCK: any[] = [
        {"panelId":1,"trainee":
        {"traineeId":1,"resourceId":1,"trainingStatus":"failing","batch":1,"phoneNumber":"375-264-5938","skypeId":"asalomon0@apple.com","profileUrl":"http://artisteer.com","recruiterName":"Paulie Tomley","college":"FSU","degree":"BS","major":"Game Dev","techScreenerName":"Alden Salomon","projectCompletion":"Complete","flagStatus":"flaggy","flagNotes":"falangist","marketingStatus":"not ready","client":"Browsecat","endClient":"Centidel","traineeUserInfo":null},
        "panelist":"Cyrillus Gynn","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"http://youtube.com/et/magnis/dis.png","status":null,"associateIntro":"enhance ubiquitous convergence","projectOneDescription":"Versatile logistical initiative","projectTwoDescription":"User-centric radical algorithm","projectThreeDescription":"Versatile tangible benchmark","communicationSkills":"they suck","overall":"you're okay","feedback":"you're okay"},

        {"panelId":2,"trainee":
        {"traineeId":2,"resourceId":2,"trainingStatus":"good","batch":1,"phoneNumber":"298-403-9000","skypeId":"chammond1@spiegel.de","profileUrl":"https://geocities.com","recruiterName":"Mart Forbear","college":"NYU","degree":"BA","major":"Business","techScreenerName":"Con Hammond","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"falangist","marketingStatus":"ready","client":"Twiyo","endClient":"Blognation","traineeUserInfo":null},
        "panelist":"Britta Chatan","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"http://github.io/blandit/non.html","status":null,"associateIntro":"leverage integrated networks","projectOneDescription":"Adaptive bifurcated success","projectTwoDescription":"Distributed heuristic adapter","projectThreeDescription":"Self-enabling next generation definition","communicationSkills":"they're okay","overall":"you're okay","feedback":"you're okay"},
        
        {"panelId":3,"trainee":
        {"traineeId":3,"resourceId":3,"trainingStatus":"failing","batch":1,"phoneNumber":"733-238-3000","skypeId":"cstuckow2@microsoft.com","profileUrl":"http://eventbrite.com","recruiterName":"Therine Soppett","college":"FSU","degree":"AS","major":"Business","techScreenerName":"Celestina Stuckow","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"flagitated","marketingStatus":"not ready","client":"Realbuzz","endClient":"Thoughtstorm","traineeUserInfo":null},
        "panelist":"Delano Ruegg","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://usatoday.com/sollicitudin/mi/sit/amet.js","status":null,"associateIntro":"leverage global initiatives","projectOneDescription":"Extended web-enabled support","projectTwoDescription":"Balanced fault-tolerant migration","projectThreeDescription":"Advanced real-time archive","communicationSkills":"they're okay","overall":"you suck","feedback":"you're okay"},
        
        {"panelId":4,"trainee":
        {"traineeId":4,"resourceId":4,"trainingStatus":"failing","batch":1,"phoneNumber":"899-706-5722","skypeId":"ibaroch3@xinhuanet.com","profileUrl":"http://flavors.me","recruiterName":"Patsy Hedley","college":"UCF","degree":"MA","major":"Computer Science","techScreenerName":"Izabel Baroch","projectCompletion":"In progress","flagStatus":"flag","flagNotes":"falangist","marketingStatus":"ready","client":"Zoovu","endClient":"Agivu","traineeUserInfo":null},
        "panelist":"Kathi Breen","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://theguardian.com/accumsan/tellus/nisi.json","status":null,"associateIntro":"deploy proactive infrastructures","projectOneDescription":"Persistent executive database","projectTwoDescription":"Focused regional emulation","projectThreeDescription":"Up-sized radical migration","communicationSkills":"they're okay","overall":"you suck","feedback":"you're okay"},
        
        {"panelId":5,"trainee":
        {"traineeId":5,"resourceId":5,"trainingStatus":"bad","batch":1,"phoneNumber":"304-650-5029","skypeId":"pkibbee4@netvibes.com","profileUrl":"https://linkedin.com","recruiterName":"Oriana Hartin","college":"NYU","degree":"MS","major":"Business","techScreenerName":"Pepillo Kibbee","projectCompletion":"Complete","flagStatus":"flaggy","flagNotes":"flag","marketingStatus":"ready","client":"Thoughtstorm","endClient":"Browsebug","traineeUserInfo":null},
        "panelist":"Almira Etienne","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://list-manage.com/eget/semper/rutrum/nulla/nunc/purus/phasellus.json","status":null,"associateIntro":"synthesize dynamic systems","projectOneDescription":"Vision-oriented systemic support","projectTwoDescription":"Universal dynamic parallelism","projectThreeDescription":"Up-sized bandwidth-monitored neural-net","communicationSkills":"they're okay","overall":"you're okay","feedback":"you suck"},
        
        {"panelId":6,"trainee":
        {"traineeId":6,"resourceId":6,"trainingStatus":"superstar","batch":1,"phoneNumber":"891-399-5619","skypeId":"omullard5@economist.com","profileUrl":"http://feedburner.com","recruiterName":"Allen Riseam","college":"FSU","degree":"BS","major":"Electrical Engineering","techScreenerName":"Olva Mullard","projectCompletion":"In progress","flagStatus":"flaggy","flagNotes":"flagitated","marketingStatus":"not ready","client":"Buzzshare","endClient":"Trudeo","traineeUserInfo":null},
        "panelist":"Mohammed Yetts","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://usda.gov/orci/luctus.aspx","status":null,"associateIntro":"empower mission-critical portals","projectOneDescription":"Persevering client-driven knowledge base","projectTwoDescription":"Phased coherent service-desk","projectThreeDescription":"Front-line eco-centric archive","communicationSkills":"they're okay","overall":"you're okay","feedback":"you suck"},
        
        {"panelId":7,"trainee":
        {"traineeId":7,"resourceId":7,"trainingStatus":"failing","batch":1,"phoneNumber":"506-155-0650","skypeId":"ecridge6@wikia.com","profileUrl":"https://rambler.ru","recruiterName":"Karol Schoolfield","college":"FSU","degree":"AS","major":"Computer Science","techScreenerName":"Ezequiel Cridge","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"flag","marketingStatus":"ready","client":"Thoughtworks","endClient":"Aimbo","traineeUserInfo":null},
        "panelist":"Sam Dogg","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://slashdot.org/mi/sit.js","status":null,"associateIntro":"architect plug-and-play initiatives","projectOneDescription":"Managed homogeneous installation","projectTwoDescription":"Compatible high-level paradigm","projectThreeDescription":"Horizontal real-time alliance","communicationSkills":"they're okay","overall":"you're okay","feedback":"you suck"},
        
        {"panelId":8,"trainee":
        {"traineeId":8,"resourceId":8,"trainingStatus":"good","batch":1,"phoneNumber":"199-418-2857","skypeId":"erudeforth7@cdbaby.com","profileUrl":"https://mapquest.com","recruiterName":"Elita Groocock","college":"NYU","degree":"BA","major":"Computer Science","techScreenerName":"Esme Rudeforth","projectCompletion":"Complete","flagStatus":"flaggy","flagNotes":"flag","marketingStatus":"not ready","client":"Dynabox","endClient":"Gevee","traineeUserInfo":null},
        "panelist":"Harper Sammons","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://jalbum.net/convallis/tortor/risus/dapibus.aspx","status":null,"associateIntro":"expedite B2B convergence","projectOneDescription":"Realigned directional implementation","projectTwoDescription":"Devolved incremental synergy","projectThreeDescription":"Enterprise-wide composite policy","communicationSkills":"they're okay","overall":"you're okay","feedback":"you're okay"},
        
        {"panelId":9,"trainee":
        {"traineeId":9,"resourceId":9,"trainingStatus":"superstar","batch":1,"phoneNumber":"479-252-6043","skypeId":"znewsome8@liveinternet.ru","profileUrl":"http://friendfeed.com","recruiterName":"Hillier McNeill","college":"UCF","degree":"AS","major":"Electrical Engineering","techScreenerName":"Zsazsa Newsome","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"flag","marketingStatus":"ready","client":"Layo","endClient":"Divavu","traineeUserInfo":null},
        "panelist":"Delcina Howatt","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://timesonline.co.uk/congue.jsp","status":null,"associateIntro":"reinvent ubiquitous experiences","projectOneDescription":"Extended scalable interface","projectTwoDescription":"Decentralized needs-based workforce","projectThreeDescription":"Visionary mission-critical alliance","communicationSkills":"they suck","overall":"you suck","feedback":"you're okay"},
        
        {"panelId":10,"trainee":
        {"traineeId":10,"resourceId":10,"trainingStatus":"bad","batch":1,"phoneNumber":"113-163-5930","skypeId":"kkindon9@salon.com","profileUrl":"https://google.com.hk","recruiterName":"Jennine Capponer","college":"FSU","degree":"BA","major":"Computer Science","techScreenerName":"Krystal Kindon","projectCompletion":"In progress","flagStatus":"flagged","flagNotes":"flagitated","marketingStatus":"not ready","client":"Tagtune","endClient":"Twinte","traineeUserInfo":null},
        "panelist":"Filbert Skoughman","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://yelp.com/donec/pharetra/magna/vestibulum/aliquet/ultrices.xml","status":null,"associateIntro":"scale intuitive architectures","projectOneDescription":"Front-line motivating monitoring","projectTwoDescription":"Optimized web-enabled database","projectThreeDescription":"Open-source fresh-thinking ability","communicationSkills":"they're okay","overall":"you suck","feedback":"you suck"},
];

// same thing, but as a single JSON string
export const panelsMOCKasJSON: String = `
[
        {"panelId":1,"trainee":
        {"traineeId":1,"resourceId":1,"trainingStatus":"failing","batch":1,"phoneNumber":"375-264-5938","skypeId":"asalomon0@apple.com","profileUrl":"http://artisteer.com","recruiterName":"Paulie Tomley","college":"FSU","degree":"BS","major":"Game Dev","techScreenerName":"Alden Salomon","projectCompletion":"Complete","flagStatus":"flaggy","flagNotes":"falangist","marketingStatus":"not ready","client":"Browsecat","endClient":"Centidel","traineeUserInfo":null},
        "panelist":"Cyrillus Gynn","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"http://youtube.com/et/magnis/dis.png","status":null,"associateIntro":"enhance ubiquitous convergence","projectOneDescription":"Versatile logistical initiative","projectTwoDescription":"User-centric radical algorithm","projectThreeDescription":"Versatile tangible benchmark","communicationSkills":"they suck","overall":"you're okay","feedback":"you're okay"},

        {"panelId":2,"trainee":
        {"traineeId":2,"resourceId":2,"trainingStatus":"good","batch":1,"phoneNumber":"298-403-9000","skypeId":"chammond1@spiegel.de","profileUrl":"https://geocities.com","recruiterName":"Mart Forbear","college":"NYU","degree":"BA","major":"Business","techScreenerName":"Con Hammond","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"falangist","marketingStatus":"ready","client":"Twiyo","endClient":"Blognation","traineeUserInfo":null},
        "panelist":"Britta Chatan","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"http://github.io/blandit/non.html","status":null,"associateIntro":"leverage integrated networks","projectOneDescription":"Adaptive bifurcated success","projectTwoDescription":"Distributed heuristic adapter","projectThreeDescription":"Self-enabling next generation definition","communicationSkills":"they're okay","overall":"you're okay","feedback":"you're okay"},
        
        {"panelId":3,"trainee":
        {"traineeId":3,"resourceId":3,"trainingStatus":"failing","batch":1,"phoneNumber":"733-238-3000","skypeId":"cstuckow2@microsoft.com","profileUrl":"http://eventbrite.com","recruiterName":"Therine Soppett","college":"FSU","degree":"AS","major":"Business","techScreenerName":"Celestina Stuckow","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"flagitated","marketingStatus":"not ready","client":"Realbuzz","endClient":"Thoughtstorm","traineeUserInfo":null},
        "panelist":"Delano Ruegg","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://usatoday.com/sollicitudin/mi/sit/amet.js","status":null,"associateIntro":"leverage global initiatives","projectOneDescription":"Extended web-enabled support","projectTwoDescription":"Balanced fault-tolerant migration","projectThreeDescription":"Advanced real-time archive","communicationSkills":"they're okay","overall":"you suck","feedback":"you're okay"},
        
        {"panelId":4,"trainee":
        {"traineeId":4,"resourceId":4,"trainingStatus":"failing","batch":1,"phoneNumber":"899-706-5722","skypeId":"ibaroch3@xinhuanet.com","profileUrl":"http://flavors.me","recruiterName":"Patsy Hedley","college":"UCF","degree":"MA","major":"Computer Science","techScreenerName":"Izabel Baroch","projectCompletion":"In progress","flagStatus":"flag","flagNotes":"falangist","marketingStatus":"ready","client":"Zoovu","endClient":"Agivu","traineeUserInfo":null},
        "panelist":"Kathi Breen","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://theguardian.com/accumsan/tellus/nisi.json","status":null,"associateIntro":"deploy proactive infrastructures","projectOneDescription":"Persistent executive database","projectTwoDescription":"Focused regional emulation","projectThreeDescription":"Up-sized radical migration","communicationSkills":"they're okay","overall":"you suck","feedback":"you're okay"},
        
        {"panelId":5,"trainee":
        {"traineeId":5,"resourceId":5,"trainingStatus":"bad","batch":1,"phoneNumber":"304-650-5029","skypeId":"pkibbee4@netvibes.com","profileUrl":"https://linkedin.com","recruiterName":"Oriana Hartin","college":"NYU","degree":"MS","major":"Business","techScreenerName":"Pepillo Kibbee","projectCompletion":"Complete","flagStatus":"flaggy","flagNotes":"flag","marketingStatus":"ready","client":"Thoughtstorm","endClient":"Browsebug","traineeUserInfo":null},
        "panelist":"Almira Etienne","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://list-manage.com/eget/semper/rutrum/nulla/nunc/purus/phasellus.json","status":null,"associateIntro":"synthesize dynamic systems","projectOneDescription":"Vision-oriented systemic support","projectTwoDescription":"Universal dynamic parallelism","projectThreeDescription":"Up-sized bandwidth-monitored neural-net","communicationSkills":"they're okay","overall":"you're okay","feedback":"you suck"},
        
        {"panelId":6,"trainee":
        {"traineeId":6,"resourceId":6,"trainingStatus":"superstar","batch":1,"phoneNumber":"891-399-5619","skypeId":"omullard5@economist.com","profileUrl":"http://feedburner.com","recruiterName":"Allen Riseam","college":"FSU","degree":"BS","major":"Electrical Engineering","techScreenerName":"Olva Mullard","projectCompletion":"In progress","flagStatus":"flaggy","flagNotes":"flagitated","marketingStatus":"not ready","client":"Buzzshare","endClient":"Trudeo","traineeUserInfo":null},
        "panelist":"Mohammed Yetts","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://usda.gov/orci/luctus.aspx","status":null,"associateIntro":"empower mission-critical portals","projectOneDescription":"Persevering client-driven knowledge base","projectTwoDescription":"Phased coherent service-desk","projectThreeDescription":"Front-line eco-centric archive","communicationSkills":"they're okay","overall":"you're okay","feedback":"you suck"},
        
        {"panelId":7,"trainee":
        {"traineeId":7,"resourceId":7,"trainingStatus":"failing","batch":1,"phoneNumber":"506-155-0650","skypeId":"ecridge6@wikia.com","profileUrl":"https://rambler.ru","recruiterName":"Karol Schoolfield","college":"FSU","degree":"AS","major":"Computer Science","techScreenerName":"Ezequiel Cridge","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"flag","marketingStatus":"ready","client":"Thoughtworks","endClient":"Aimbo","traineeUserInfo":null},
        "panelist":"Sam Dogg","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://slashdot.org/mi/sit.js","status":null,"associateIntro":"architect plug-and-play initiatives","projectOneDescription":"Managed homogeneous installation","projectTwoDescription":"Compatible high-level paradigm","projectThreeDescription":"Horizontal real-time alliance","communicationSkills":"they're okay","overall":"you're okay","feedback":"you suck"},
        
        {"panelId":8,"trainee":
        {"traineeId":8,"resourceId":8,"trainingStatus":"good","batch":1,"phoneNumber":"199-418-2857","skypeId":"erudeforth7@cdbaby.com","profileUrl":"https://mapquest.com","recruiterName":"Elita Groocock","college":"NYU","degree":"BA","major":"Computer Science","techScreenerName":"Esme Rudeforth","projectCompletion":"Complete","flagStatus":"flaggy","flagNotes":"flag","marketingStatus":"not ready","client":"Dynabox","endClient":"Gevee","traineeUserInfo":null},
        "panelist":"Harper Sammons","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://jalbum.net/convallis/tortor/risus/dapibus.aspx","status":null,"associateIntro":"expedite B2B convergence","projectOneDescription":"Realigned directional implementation","projectTwoDescription":"Devolved incremental synergy","projectThreeDescription":"Enterprise-wide composite policy","communicationSkills":"they're okay","overall":"you're okay","feedback":"you're okay"},
        
        {"panelId":9,"trainee":
        {"traineeId":9,"resourceId":9,"trainingStatus":"superstar","batch":1,"phoneNumber":"479-252-6043","skypeId":"znewsome8@liveinternet.ru","profileUrl":"http://friendfeed.com","recruiterName":"Hillier McNeill","college":"UCF","degree":"AS","major":"Electrical Engineering","techScreenerName":"Zsazsa Newsome","projectCompletion":"Complete","flagStatus":"flagged","flagNotes":"flag","marketingStatus":"ready","client":"Layo","endClient":"Divavu","traineeUserInfo":null},
        "panelist":"Delcina Howatt","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://timesonline.co.uk/congue.jsp","status":null,"associateIntro":"reinvent ubiquitous experiences","projectOneDescription":"Extended scalable interface","projectTwoDescription":"Decentralized needs-based workforce","projectThreeDescription":"Visionary mission-critical alliance","communicationSkills":"they suck","overall":"you suck","feedback":"you're okay"},
        
        {"panelId":10,"trainee":
        {"traineeId":10,"resourceId":10,"trainingStatus":"bad","batch":1,"phoneNumber":"113-163-5930","skypeId":"kkindon9@salon.com","profileUrl":"https://google.com.hk","recruiterName":"Jennine Capponer","college":"FSU","degree":"BA","major":"Computer Science","techScreenerName":"Krystal Kindon","projectCompletion":"In progress","flagStatus":"flagged","flagNotes":"flagitated","marketingStatus":"not ready","client":"Tagtune","endClient":"Twinte","traineeUserInfo":null},
        "panelist":"Filbert Skoughman","duration":"error: Function 'string' not found","format":null,"internet":null,"panelRound":null,"recordingConsent":null,"recordingLink":"https://yelp.com/donec/pharetra/magna/vestibulum/aliquet/ultrices.xml","status":null,"associateIntro":"scale intuitive architectures","projectOneDescription":"Front-line motivating monitoring","projectTwoDescription":"Optimized web-enabled database","projectThreeDescription":"Open-source fresh-thinking ability","communicationSkills":"they're okay","overall":"you suck","feedback":"you suck"},
]
`;
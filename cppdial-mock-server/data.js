data = {
    audio: [
        [
            'See all my alarms',
            'Create an alarm for 9 Sunday morning',
            //'Delete all of my alarms',
            'See my first alarm',
            'Create an alarm every Monday, Wednesday, and Friday called Team Standup',
            'Add a reoccuring alarm Monday through Friday for 2pm called take a break',
            'Go to my alarm called soccer game',
            'Show me my 8 pm alarm'
        ],
        [
            'Show me the second one',
            'Enable the first one',
            'Switch the occurance of the third one',
            'Change the time of my weekday wakeup to 6am',
            'Change my go to bed alarm to monday through friday'
        ]
    ],

    followup: [
        {
            id: 4,
            text: 'fun run',
            response: 12
        },
        {
            id: 5,
            text: '11 am',
            response: 13
        },
        /*{
            text: 'Duplicate this alarm and set it for 10:30 am',
            response: 14
        }*/
    ],

    responses: [
        {
            action: 'show_alarms',
            data: [], //should this return all alarms again?
            tts: 'Here are your alarms',
            followup: false
        },
        {
            action: 'create_alarm',
            data: {
                id: 4,
                name: '',
                dates: ['S'],
                time: '9:00 am',
                reoccuring: false,
                active: false
            },
            tts: 'I have created an alarm for Sunday at 9am. What would you like to call it?',
            followup: true
        },
        {
            action: 'show_alarm',
            data: {
                id: 0,
                name: 'Weekday Wake Up',
                dates: ['M', 'T', 'W', 'Th', 'F'],
                time: '7:00 am',
                reoccuring: true,
                active: true
            },
            tts: 'Here is your first alarm called Weekday Wake Up',
            followup: false
        },
        {
            action: 'create_alarm',
            data: {
                id: 5,
                name: 'Team Standup',
                dates: ['M','W','F'],
                time: '',
                reoccuring: true,
                active: false
            },
            tts: 'I have created an alarm called Team Standup for Monday, Wednesday, and Friday. What time would you like this set?',
            followup: true
        },
        {
            action: 'create_alarm',
            data: {
                id: 6,
                name: 'take a break',
                dates: ['M', 'T', 'W', 'Th', 'F'],
                time: '2:00 pm',
                reoccuring: true,
                active: true
            },
            tts: 'I have created an alarm called take a break for 2 pm on Monday through Friday',
            followup: false
        },
        {
            action: 'show_alarm',
            data: {
                id: 2,
                name: 'Soccer game',
                dates: ['T'],
                time: '7:45 pm',
                reoccuring: false,
                active: true
            },
            tts: 'Here is your alarm called soccer game',
            followup: false
        },
        {
            action: 'default',
            data: {},
            tts: 'I could not find an 8pm alarm',
            followup: false
        },
        /*{
            action: 'delete_alarms',
            data: [],
            tts: 'I have deleted all of your alarms',
            followup: false
        },*/
        {
            action: 'show_alarm',
            data: {
                id: 1,
                name: 'Pick up kids',
                dates: ['M', 'W', 'F'],
                time: '5:30 pm',
                reoccuring: true,
                active: false
            },
            tts: 'Here is your second alarm',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 1,
                name: 'Pick up kids',
                dates: ['M', 'W', 'F'],
                time: '5:30 pm',
                reoccuring: true,
                active: true
            },
            tts: 'Your alarm called Pick up kids is now active',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 2,
                name: 'Soccer game',
                dates: ['T'],
                time: '7:45 pm',
                reoccuring: true,
                active: true
            },
            tts: 'Your alarm called Soccer game is now reoccuring',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 0,
                name: 'Weekday Wake Up',
                dates: ['M', 'T', 'W', 'Th', 'F'],
                time: '6:00 am',
                reoccuring: true,
                active: true
            },
            tts: 'Okay, I\'ve changed the time of your Weekday wake up alarm to 6 am',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 3,
                name: 'Go to Bed',
                dates: ['M', 'T', 'W', 'Th', 'F'],
                time: '11:00 pm',
                reoccuring: true,
                active: true
            },
            tts: 'I\'ve changed the dates for your Go to Bed alarm to Monday through Friday',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 4,
                name: 'Fun Run',
                dates: ['S'],
                time: '9:00 am',
                reoccuring: false,
                active: false
            },
            tts: 'Okay, I have set the name to Fun Run',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 5,
                name: 'Team Standup',
                dates: ['M','W','F'],
                time: '11 am',
                reoccuring: true,
                active: false
            },
            tts: 'Your Team Standup alarm is now set for 11 am',
            followup: false
        },
        {
            action: 'update_alarm',
            data: {
                id: 7,
                name: 'take a break',
                dates: ['M', 'T', 'W', 'Th', 'F'],
                time: '10:30 am',
                reoccuring: true,
                active: true
            },
            tts: 'Okay, I have created a new alarm called take a break for Monday through Friday at 11 am',
            followup: false
        }
    ],

    alarms: [
        {
            id: 0,
            name: 'Weekday Wake Up',
            dates: ['M', 'T', 'W', 'Th', 'F'],
            time: '7:00 am',
            reoccuring: true,
            active: true
        },
        {
            id: 1,
            name: 'Pick up kids',
            dates: ['M', 'W', 'F'],
            time: '5:30 pm',
            reoccuring: true,
            active: false
        },
        {
            id: 2,
            name: 'Soccer game',
            dates: ['T'],
            time: '7:45 pm',
            reoccuring: false,
            active: true
        },
        {
            id: 3,
            name: 'Go to Bed',
            dates: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
            time: '11:00 pm',
            reoccuring: true,
            active: true
        },
    ]
}

module.exports = data;
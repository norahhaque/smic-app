import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import prayerData from "../../data/prayers.json";

interface Prayer {
  prayer_time: string;
  iqamah_time?: string;
}

interface PrayerDay {
  date: string;
  prayers: {
    fajr: Prayer;
    sunrise: { prayer_time: string };
    dhuhr: Prayer;
    asr: Prayer;
    maghrib: Prayer;
    isha: Prayer;
  };
}

const jummmahData = [
  { time: "12:00 PM", speaker: "Imam Asad Zaman" },
  { time: "1:30 PM", speaker: "Imam Asad Zaman" }
]

// Prayer time state management and logic
const PrayerScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todaysPrayers, setTodaysPrayers] = useState<PrayerDay | null>(null);
  const [tomorrowsPrayers, setTomorrowsPrayers] = useState<PrayerDay | null>(null);
  const [yesterdaysPrayers, setYesterdaysPrayers] = useState<PrayerDay | null>(null);
  const [isJummah, setIsJummah] = useState(false);
  const [showJummah, setShowJummah] = useState(false);

  const [prayerStatus, setPrayerStatus] = useState<{
    currentPrayer: { name: string; time: string } | null;
    nextPrayer: { name: string; time: string } | null;
    timeUntillNext: number | null;
  }>({
    currentPrayer: null,
    nextPrayer: null,
    timeUntillNext: null
  });

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setIsJummah(today.getDay() === 5);

    const todayStr = today.toISOString().split('T')[0];
    const todaysPrayer = prayerData.find(item => item.date === todayStr) ?? null;
    setTodaysPrayers(todaysPrayer);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const tomorrowPrayers = prayerData.find(item => item.date === tomorrowStr) ?? null;
    setTomorrowsPrayers(tomorrowPrayers);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const yesterdayPrayers = prayerData.find(item => item.date === yesterdayStr) ?? null;
    setYesterdaysPrayers(yesterdayPrayers);

  }, []);

  useEffect(() => {
    if (!todaysPrayers || !tomorrowsPrayers || !yesterdaysPrayers) return;

    const interval = setInterval(() => {
      setPrayerStatus(getPrayerStatus(todaysPrayers, tomorrowsPrayers, yesterdaysPrayers));
    }, 1000);

    return () => clearInterval(interval);
  }, [todaysPrayers, tomorrowsPrayers, yesterdaysPrayers]);


  useEffect(() => {
    if (todaysPrayers && tomorrowsPrayers && yesterdaysPrayers) {
      setPrayerStatus(getPrayerStatus(todaysPrayers, tomorrowsPrayers, yesterdaysPrayers));
    }
  }, [todaysPrayers, tomorrowsPrayers, yesterdaysPrayers, currentDate]);

  // Converts "12:30 PM" to total minutes from midnight (750)
  const timeStrToMinutes = (timeStr: string) => {
    let [time, meridian] = timeStr.split(' ');
    const [hoursStr, minutesStr] = time.split(":");

    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (meridian) {
      if (meridian.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (meridian.toUpperCase() === "AM" && hours === 12) hours = 0;
    }

    return hours * 60 + minutes;
  }

  // Converts total minutes till next prayer (200) into a human readable string: '3 hours and 20 minutes'
  const minutesToTimeStr = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60 - 1;

    let result = "";
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) {
      if (hours > 0) result += " ";
      result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return result || "0 minutes";
  };

  useEffect(() => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    if (isJummah) {
      const firstJummah = timeStrToMinutes(jummmahData[0].time);
      const secondJummah = timeStrToMinutes(jummmahData[0].time);

      if (nowMinutes <= secondJummah + 60) {
        setShowJummah(true);
      } else {
        setShowJummah(false);
      } 
    } else {
      setShowJummah(false);
    }
  })


  // Creates variable holding current prayer, next prayer, and minutes till next prayer
  const getPrayerStatus = (
    todaysPrayers: PrayerDay,
    tomorrowsPrayers: PrayerDay,
    yesterdaysPrayers: PrayerDay
  ) => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const prayersArray = [
      { name: 'Fajr', time: todaysPrayers.prayers.fajr.prayer_time },
      { name: 'Duha', time: todaysPrayers.prayers.sunrise.prayer_time },
      { name: 'Dhuhr', time: todaysPrayers.prayers.dhuhr.prayer_time },
      { name: 'Asr', time: todaysPrayers.prayers.asr.prayer_time },
      { name: 'Maghrib', time: todaysPrayers.prayers.maghrib.prayer_time },
      { name: 'Isha', time: todaysPrayers.prayers.isha.prayer_time },
    ];

    let currentPrayer = null;
    let nextPrayer = null;

    for (const prayer of prayersArray) {
      const prayerMinutes = timeStrToMinutes(prayer.time);

      if (prayerMinutes <= nowMinutes) {
        currentPrayer = prayer;
      } else if (!nextPrayer) {
        nextPrayer = prayer;
        break;
      }
    }

    // Early morning (before Fajr) edge case 
    if (!currentPrayer) {
      currentPrayer = { name: 'Isha', time: yesterdaysPrayers.prayers.isha.prayer_time };
      nextPrayer = prayersArray[0]; // Today's Fajr
    }

    // Late night (after Isha) edge case
    if (!nextPrayer) {
      nextPrayer = { name: 'Fajr', time: tomorrowsPrayers.prayers.fajr.prayer_time };
    }

    const currentMinutes = timeStrToMinutes(currentPrayer.time);
    const nextMinutes = timeStrToMinutes(nextPrayer.time);

    let timeUntillNext = nextMinutes - nowMinutes;
    if (timeUntillNext < 0) {
      // Next prayer is after midnight tomorrow
      timeUntillNext += 24 * 60;
    }

    return {
      currentPrayer,
      nextPrayer,
      timeUntillNext
    };
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" />

        {/* MAS logo at top left */}
        <View className="absolute top-4 left-4 z-10">
          <Image source={require('../../assets/images/mas-logo.png')} className="w-12 h-12" resizeMode="contain" />
        </View>

        {/* Current and Next Prayer */}
        <Text className='text-blue-main text-5xl font-dmserif mt-28 mx-5'>{prayerStatus.currentPrayer?.name}</Text>
        <Text className='text-green-main text-xl font-raleway-semibold mt-[-7] mx-5' style={{ flexWrap: 'wrap' }}>{minutesToTimeStr(prayerStatus?.timeUntillNext ?? 0)} until {prayerStatus.nextPrayer?.name}</Text>
        
        {/* Date in Gregorian and Islamic Calendar */}
          <Text className="text-blue-dark font-lato-light text-[16px] mx-5 mt-5 mb-1">{currentDate && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
          <Text className="text-blue-dark font-lato-light text-[16px] mb-4 mx-5">{new Intl.DateTimeFormat('en-US-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' }).format(currentDate)} </Text>

        {/* Seperator Arch Image  */}
        <Image source={require('../../assets/images/blue-geometric-outline-2.png')} className="w-full h-[120px] resize-contain mt-10" />

        <View className="px-6">
          {/* Optional Jummah Display */}
          {isJummah && showJummah && (
            <View className="my-8 items-center justify-center h-22 w-19 bg-blue-main rounded-2xl p-2">
              <Text className="text-white font-dmserif font-bold text-2xl mt-3 mb-1 text-center">Jummah Schedule</Text>
              {jummmahData.map((item, idx) => (
                <Text key={idx} className="text-white text-lg font-lato-regular mb-1">
                  {item.time} — {item.speaker}
                </Text>
              ))}
            </View>
          )}

          {todaysPrayers ? (
            <View className="mt-4">
              {/* Table header */}
              <View className="flex-row items-center mb-2">
                <Text className="flex-1 text-blue-dark text-xl font-dmserif text-center ml-[-19]">Prayer</Text>
                <Text className="flex-1 text-blue-dark text-xl font-dmserif text-center">Prayer Time</Text>
                <Text className="flex-1 text-blue-dark text-xl font-dmserif text-center">Iqamah Time</Text>
              </View>

              {/* Prayer rows */}
              {Object.entries(todaysPrayers.prayers).map(([name, times]) => {
                const prayer = times as Prayer;
                return (
                  <View
                    key={name}
                    className="flex-row items-center py-4 px-6 mb-3 bg-white rounded-full shadow-sm"
                  >
                    <Text className="flex-1 text-green-dark font-lato capitalize">{name}</Text>
                    <Text className="flex-1 text-blue-main text-center font-lato">{prayer.prayer_time}</Text>
                    <Text className="flex-1 text-blue-dark text-center font-lato-bold">{prayer.iqamah_time ?? '-'}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text className="text-accent-red text-center mt-10 font-lato-bold">No prayer data available for today.</Text>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrayerScreen;

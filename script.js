document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let cards = [];
    let filteredCards = [];
    let sortDirection = {};
    
    // DOM elements
    const cardTableBody = document.getElementById('cardTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const setFilter = document.getElementById('setFilter');
    const colorFilter = document.getElementById('colorFilter');
    const rarityFilter = document.getElementById('rarityFilter');
    const uploadBtn = document.getElementById('uploadBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const fileInput = document.getElementById('fileInput');
    const totalCards = document.getElementById('totalCards');
    const totalNormal = document.getElementById('totalNormal');
    const totalFoil = document.getElementById('totalFoil');
    
    // Initialize with sample data
    initializeWithSampleData();
    
    // Event listeners
    searchBtn.addEventListener('click', filterCards);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterCards();
    });
    
    setFilter.addEventListener('change', filterCards);
    colorFilter.addEventListener('change', filterCards);
    rarityFilter.addEventListener('change', filterCards);
    
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    downloadBtn.addEventListener('click', downloadData);
    resetBtn.addEventListener('click', resetData);
    
    // Initialize with sample data
    function initializeWithSampleData() {
        // Parse the provided card data
        const dataString = `lorcana 101225
0 | name | subtitle | set | card_number | color_1 | color_2 | rarity | normal | foil | 
1 | Ariel | On Human Legs | 1 | 1 | Amber |  | Uncommon | 0 | 0 | 
2 | Ariel | Spectacular Singer | 1 | 2 | Amber |  | Super Rare | 0 | 0 | 
3 | Cinderella | Gentle and Kind | 1 | 3 | Amber |  | Uncommon | 0 | 0 | 
4 | Goofy | Musketeer | 1 | 4 | Amber |  | Uncommon | 0 | 0 | 
5 | Hades | King of Olympus | 1 | 5 | Amber |  | Rare | 0 | 0 | 
6 | Hades | Lord of the Underworld | 1 | 6 | Amber |  | Rare | 0 | 0 | 
7 | HeiHei | Boat Snack | 1 | 7 | Amber |  | Common | 0 | 0 | 
8 | LeFou | Bumbler | 1 | 8 | Amber |  | Uncommon | 0 | 0 | 
9 | Lilo | Making a Wish | 1 | 9 | Amber |  | Rare | 0 | 0 | 
10 | Maximus | Palace Horse | 1 | 10 | Amber |  | Super Rare | 0 | 0 | 
11 | Maximus | Relentless Pursuer | 1 | 11 | Amber |  | Uncommon | 0 | 0 | 
12 | Mickey Mouse | True Friend | 1 | 12 | Amber |  | Uncommon | 0 | 0 | 
13 | Minnie Mouse | Beloved Princess | 1 | 13 | Amber |  | Common | 0 | 0 | 
14 | Moana | Of Motunui | 1 | 14 | Amber |  | Rare | 0 | 0 | 
15 | Mr. Smee | Loyal First Mate | 1 | 15 | Amber |  | Common | 0 | 0 | 
16 | Prince Phillip | Dragonslayer | 1 | 16 | Amber |  | Uncommon | 0 | 0 | 
17 | Pumbaa | Friendly Warthog | 1 | 17 | Amber |  | Common | 0 | 0 | 
18 | Rapunzel | Gifted with Healing | 1 | 18 | Amber |  | Legendary | 0 | 0 | 
19 | Sebastian | Court Composer | 1 | 19 | Amber |  | Common | 0 | 0 | 
20 | Simba | Protective Cub | 1 | 20 | Amber |  | Common | 0 | 0 | 
21 | Stitch | Carefree Surfer | 1 | 21 | Amber |  | Legendary | 0 | 0 | 
22 | Stitch | New Dog | 1 | 22 | Amber |  | Common | 0 | 0 | 
23 | Stitch | Rock Star | 1 | 23 | Amber |  | Super Rare | 0 | 0 | 
24 | Timon | Grub Rustler | 1 | 24 | Amber |  | Common | 0 | 0 | 
25 | Be Our Guest |  | 1 | 25 | Amber |  | Uncommon | 0 | 0 | 
26 | Control Your Temper! |  | 1 | 26 | Amber |  | Common | 0 | 0 | 
27 | Hakuna Matata |  | 1 | 27 | Amber |  | Common | 0 | 0 | 
28 | Healing Glow |  | 1 | 28 | Amber |  | Common | 0 | 0 | 
29 | Just in Time |  | 1 | 29 | Amber |  | Rare | 0 | 0 | 
30 | Part of Your World |  | 1 | 30 | Amber |  | Rare | 0 | 0 | 
31 | You Have Forgotten Me |  | 1 | 31 | Amber |  | Uncommon | 0 | 0 | 
32 | Dinglehopper |  | 1 | 32 | Amber |  | Common | 0 | 0 | 
33 | Lantern |  | 1 | 33 | Amber |  | Rare | 0 | 0 | 
34 | Ursula's Shell Necklace |  | 1 | 34 | Amber |  | Rare | 0 | 0 | 
35 | Anna | Heir to Arendelle | 1 | 35 | Amethyst |  | Uncommon | 0 | 0 | 
36 | Archimedes | Highly Educated Owl | 1 | 36 | Amethyst |  | Common | 0 | 0 | 
37 | Dr. Facilier | Agent Provocateur | 1 | 37 | Amethyst |  | Rare | 0 | 0 | 
38 | Dr. Facilier | Charlatan | 1 | 38 | Amethyst |  | Common | 0 | 0 | 
39 | Dr. Facilier | Remarkable Gentleman | 1 | 39 | Amethyst |  | Rare | 0 | 0 | 
40 | Elsa | Queen Regent | 1 | 40 | Amethyst |  | Common | 0 | 0 | 
41 | Elsa | Snow Queen | 1 | 41 | Amethyst |  | Uncommon | 0 | 0 | 
42 | Elsa | Spirit of Winter | 1 | 42 | Amethyst |  | Legendary | 0 | 0 | 
43 | Flotsam | Ursula's Spy | 1 | 43 | Amethyst |  | Rare | 0 | 0 | 
44 | Jafar | Keeper of Secrets | 1 | 44 | Amethyst |  | Rare | 0 | 0 | 
45 | Jafar | Wicked Sorcerer | 1 | 45 | Amethyst |  | Common | 0 | 0 | 
46 | Jetsam | Ursula's Spy | 1 | 46 | Amethyst |  | Common | 0 | 0 | 
47 | Magic Broom | Bucket Brigade | 1 | 47 | Amethyst |  | Common | 0 | 0 | 
48 | Maleficent | Biding Her Time | 1 | 48 | Amethyst |  | Rare | 0 | 0 | 
49 | Maleficent | Sorceress | 1 | 49 | Amethyst |  | Common | 0 | 0 | 
50 | Marshmallow | Persistent Guardian | 1 | 50 | Amethyst |  | Super Rare | 0 | 0 | 
51 | Mickey Mouse | Wayward Sorcerer | 1 | 51 | Amethyst |  | Super Rare | 0 | 0 | 
52 | Olaf | Friendly Snowman | 1 | 52 | Amethyst |  | Uncommon | 0 | 0 | 
53 | Pascal | Rapunzel's Companion | 1 | 53 | Amethyst |  | Uncommon | 0 | 0 | 
54 | Rafiki | Mysterious Sage | 1 | 54 | Amethyst |  | Uncommon | 0 | 0 | 
55 | Sven | Official Ice Deliverer | 1 | 55 | Amethyst |  | Uncommon | 0 | 0 | 
56 | The Queen | Wicked and Vain | 1 | 56 | Amethyst |  | Super Rare | 0 | 0 | 
57 | The Wardrobe | Belle's Confidant | 1 | 57 | Amethyst |  | Common | 0 | 0 | 
58 | Tinker Bell | Peter Pan's Ally | 1 | 58 | Amethyst |  | Common | 0 | 0 | 
59 | Ursula | Power Hungry | 1 | 59 | Amethyst |  | Legendary | 0 | 0 | 
60 | Yzma | Alchemist | 1 | 60 | Amethyst |  | Common | 0 | 0 | 
61 | Zeus | God of Lightning | 1 | 61 | Amethyst |  | Rare | 0 | 0 | 
62 | Befuddle |  | 1 | 62 | Amethyst |  | Uncommon | 0 | 0 | 
63 | Freeze |  | 1 | 63 | Amethyst |  | Common | 0 | 0 | 
64 | Friends on the Other Side |  | 1 | 64 | Amethyst |  | Common | 0 | 0 | 
65 | Reflection |  | 1 | 65 | Amethyst |  | Uncommon | 0 | 0 | 
66 | Magic Mirror |  | 1 | 66 | Amethyst |  | Rare | 0 | 0 | 
67 | Ursula's Cauldron |  | 1 | 67 | Amethyst |  | Uncommon | 0 | 0 | 
68 | White Rabbit's Pocket Watch |  | 1 | 68 | Amethyst |  | Rare | 0 | 0 | 
69 | Aladdin | Prince Ali | 1 | 69 | Emerald |  | Common | 0 | 0 | 
70 | Beast | Wolfsbane | 1 | 70 | Emerald |  | Legendary | 0 | 0 | 
71 | Cheshire Cat | Not All There | 1 | 71 | Emerald |  | Uncommon | 0 | 0 | 
72 | Cruella De Vil | Miserable as Usual | 1 | 72 | Emerald |  | Rare | 0 | 0 | 
73 | Duke of Weselton | Opportunistic Official | 1 | 73 | Emerald |  | Common | 0 | 0 | 
74 | Flynn Rider | Charming Rogue | 1 | 74 | Emerald |  | Uncommon | 0 | 0 | 
75 | Genie | On the Job | 1 | 75 | Emerald |  | Super Rare | 0 | 0 | 
76 | Genie | Powers Unleashed | 1 | 76 | Emerald |  | Rare | 0 | 0 | 
77 | Genie | The Ever Impressive | 1 | 77 | Emerald |  | Common | 0 | 0 | 
78 | Hans | Scheming Prince | 1 | 78 | Emerald |  | Rare | 0 | 0 | 
79 | Horace | No-Good Scoundrel | 1 | 79 | Emerald |  | Common | 0 | 0 | 
80 | Iago | Loud-Mouthed Parrot | 1 | 80 | Emerald |  | Rare | 0 | 0 | 
81 | Jasper | Common Crook | 1 | 81 | Emerald |  | Uncommon | 0 | 0 | 
82 | John Silver | Alien Pirate | 1 | 82 | Emerald |  | Legendary | 0 | 0 | 
83 | Jumba Jookiba | Renegade Scientist | 1 | 83 | Emerald |  | Uncommon | 0 | 0 | 
84 | Kuzco | Temperamental Emperor | 1 | 84 | Emerald |  | Rare | 0 | 0 | 
85 | Lady Tremaine | Wicked Stepmother | 1 | 85 | Emerald |  | Rare | 0 | 0 | 
86 | Mad Hatter | Gracious Host | 1 | 86 | Emerald |  | Uncommon | 0 | 0 | 
87 | Megara | Pulling the Strings | 1 | 87 | Emerald |  | Common | 0 | 0 | 
88 | Mickey Mouse | Artful Rogue | 1 | 88 | Emerald |  | Super Rare | 0 | 0 | 
89 | Mickey Mouse | Steamboat Pilot | 1 | 89 | Emerald |  | Common | 0 | 0 | 
90 | Mother Gothel | Selfish Manipulator | 1 | 90 | Emerald |  | Super Rare | 0 | 0 | 
91 | Peter Pan | Never Landing | 1 | 91 | Emerald |  | Common | 0 | 0 | 
92 | Tamatoa | Drab Little Crab | 1 | 92 | Emerald |  | Uncommon | 0 | 0 | 
93 | Tinker Bell | Most Helpful | 1 | 93 | Emerald |  | Common | 0 | 0 | 
94 | Do It Again! |  | 1 | 94 | Emerald |  | Rare | 0 | 0 | 
95 | Mother Knows Best |  | 1 | 95 | Emerald |  | Uncommon | 0 | 0 | 
96 | Stampede |  | 1 | 96 | Emerald |  | Common | 0 | 0 | 
97 | Steal from the Rich |  | 1 | 97 | Emerald |  | Rare | 0 | 0 | 
98 | Sudden Chill |  | 1 | 98 | Emerald |  | Common | 0 | 0 | 
99 | The Beast is Mine! |  | 1 | 99 | Emerald |  | Uncommon | 0 | 0 | 
100 | Vicious Betrayal |  | 1 | 100 | Emerald |  | Common | 0 | 0 | 
101 | Dr. Facilier's Cards |  | 1 | 101 | Emerald |  | Uncommon | 0 | 0 | 
102 | Stolen Scimitar |  | 1 | 102 | Emerald |  | Common | 0 | 0 | 
103 | Abu | Mischievous Monkey | 1 | 103 | Ruby |  | Common | 0 | 0 | 
104 | Aladdin | Heroic Outlaw | 1 | 104 | Ruby |  | Super Rare | 0 | 0 | 
105 | Aladdin | Street Rat | 1 | 105 | Ruby |  | Common | 0 | 0 | 
106 | Captain | Colonel's Lieutenant | 1 | 106 | Ruby |  | Uncommon | 0 | 0 | 
107 | Captain Hook | Ruthless Pirate | 1 | 107 | Ruby |  | Rare | 0 | 0 | 
108 | Donald Duck | Boisterous Fowl | 1 | 108 | Ruby |  | Uncommon | 0 | 0 | 
109 | Elsa | Ice Surfer | 1 | 109 | Ruby |  | Common | 0 | 0 | 
110 | Gaston | Arrogant Hunter | 1 | 110 | Ruby |  | Common | 0 | 0 | 
111 | Goofy | Daredevil | 1 | 111 | Ruby |  | Common | 0 | 0 | 
112 | LeFou | Instigator | 1 | 112 | Ruby |  | Rare | 0 | 0 | 
113 | Maleficent | Monstrous Dragon | 1 | 113 | Ruby |  | Legendary | 0 | 0 | 
114 | Maui | Hero to All | 1 | 114 | Ruby |  | Rare | 0 | 0 | 
115 | Mickey Mouse | Brave Little Tailor | 1 | 115 | Ruby |  | Legendary | 0 | 0 | 
116 | Minnie Mouse | Always Classy | 1 | 116 | Ruby |  | Common | 0 | 0 | 
117 | Moana | Chosen by the Ocean | 1 | 117 | Ruby |  | Uncommon | 0 | 0 | 
118 | Mulan | Imperial Soldier | 1 | 118 | Ruby |  | Super Rare | 0 | 0 | 
119 | Peter Pan | Fearless Fighter | 1 | 119 | Ruby |  | Common | 0 | 0 | 
120 | Pongo | Ol' Rascal | 1 | 120 | Ruby |  | Common | 0 | 0 | 
121 | Rapunzel | Letting Down Her Hair | 1 | 121 | Ruby |  | Uncommon | 0 | 0 | 
122 | Scar | Fiery Usurper | 1 | 122 | Ruby |  | Common | 0 | 0 | 
123 | Scar | Shameless Firebrand | 1 | 123 | Ruby |  | Rare | 0 | 0 | 
124 | Sergeant Tibbs | Courageous Cat | 1 | 124 | Ruby |  | Common | 0 | 0 | 
125 | Stitch | Abomination | 1 | 125 | Ruby |  | Rare | 0 | 0 | 
126 | Te Kā | The Burning One | 1 | 126 | Ruby |  | Super Rare | 0 | 0 | 
127 | Tigger | Wonderful Thing | 1 | 127 | Ruby |  | Uncommon | 0 | 0 | 
128 | Be Prepared |  | 1 | 128 | Ruby |  | Rare | 0 | 0 | 
129 | Cut to the Chase |  | 1 | 129 | Ruby |  | Uncommon | 0 | 0 | 
130 | Dragon Fire |  | 1 | 130 | Ruby |  | Uncommon | 0 | 0 | 
131 | Fan the Flames |  | 1 | 131 | Ruby |  | Uncommon | 0 | 0 | 
132 | He's Got a Sword! |  | 1 | 132 | Ruby |  | Common | 0 | 0 | 
133 | Tangle |  | 1 | 133 | Ruby |  | Common | 0 | 0 | 
134 | Poisoned Apple |  | 1 | 134 | Ruby |  | Rare | 0 | 0 | 
135 | Shield of Virtue |  | 1 | 135 | Ruby |  | Uncommon | 0 | 0 | 
136 | Sword of Truth |  | 1 | 136 | Ruby |  | Rare | 0 | 0 | 
137 | Ariel | Whoseit Collector | 1 | 137 | Sapphire |  | Rare | 0 | 0 | 
138 | Aurora | Briar Rose | 1 | 138 | Sapphire |  | Common | 0 | 0 | 
139 | Aurora | Dreaming Guardian | 1 | 139 | Sapphire |  | Super Rare | 0 | 0 | 
140 | Aurora | Regal Princess | 1 | 140 | Sapphire |  | Uncommon | 0 | 0 | 
141 | Belle | Inventive Engineer | 1 | 141 | Sapphire |  | Uncommon | 0 | 0 | 
142 | Belle | Strange but Special | 1 | 142 | Sapphire |  | Legendary | 0 | 0 | 
143 | Chief Tui | Respected Leader | 1 | 143 | Sapphire |  | Uncommon | 0 | 0 | 
144 | Donald Duck | Strutting His Stuff | 1 | 144 | Sapphire |  | Common | 0 | 0 | 
145 | Flounder | Voice of Reason | 1 | 145 | Sapphire |  | Common | 0 | 0 | 
146 | Gramma Tala | Storyteller | 1 | 146 | Sapphire |  | Uncommon | 0 | 0 | 
147 | Hades | Infernal Schemer | 1 | 147 | Sapphire |  | Legendary | 0 | 0 | 
148 | Jasmine | Disguised | 1 | 148 | Sapphire |  | Common | 0 | 0 | 
149 | Jasmine | Queen of Agrabah | 1 | 149 | Sapphire |  | Rare | 0 | 0 | 
150 | Maleficent | Sinister Visitor | 1 | 150 | Sapphire |  | Common | 0 | 0 | 
151 | Maleficent | Uninvited | 1 | 151 | Sapphire |  | Rare | 0 | 0 | 
152 | Maurice | World-Famous Inventor | 1 | 152 | Sapphire |  | Rare | 0 | 0 | 
153 | Merlin | Self-Appointed Mentor | 1 | 153 | Sapphire |  | Common | 0 | 0 | 
154 | Mickey Mouse | Detective | 1 | 154 | Sapphire |  | Common | 0 | 0 | 
155 | Mufasa | King of the Pride Lands | 1 | 155 | Sapphire |  | Common | 0 | 0 | 
156 | Philoctetes | Trainer of Heroes | 1 | 156 | Sapphire |  | Common | 0 | 0 | 
157 | Robin Hood | Unrivaled Archer | 1 | 157 | Sapphire |  | Super Rare | 0 | 0 | 
158 | Scar | Mastermind | 1 | 158 | Sapphire |  | Rare | 0 | 0 | 
159 | Tamatoa | So Shiny! | 1 | 159 | Sapphire |  | Super Rare | 0 | 0 | 
160 | Triton | The Sea King | 1 | 160 | Sapphire |  | Uncommon | 0 | 0 | 
161 | Develop Your Brain |  | 1 | 161 | Sapphire |  | Common | 0 | 0 | 
162 | If it's Not Baroque |  | 1 | 162 | Sapphire |  | Rare | 0 | 0 | 
163 | Let it Go |  | 1 | 163 | Sapphire |  | Rare | 0 | 0 | 
164 | One Jump Ahead |  | 1 | 164 | Sapphire |  | Uncommon | 0 | 0 | 
165 | Work Together |  | 1 | 165 | Sapphire |  | Common | 0 | 0 | 
166 | Coconut Basket |  | 1 | 166 | Sapphire |  | Uncommon | 0 | 0 | 
167 | Eye of the Fates |  | 1 | 167 | Sapphire |  | Uncommon | 0 | 0 | 
168 | Fishbone Quill |  | 1 | 168 | Sapphire |  | Rare | 0 | 0 | 
169 | Magic Golden Flower |  | 1 | 169 | Sapphire |  | Common | 0 | 0 | 
170 | Scepter of Arendelle |  | 1 | 170 | Sapphire |  | Uncommon | 0 | 0 | 
171 | Aladdin | Cornered Swordsman | 1 | 171 | Steel |  | Common | 0 | 0 | 
172 | Beast | Hardheaded | 1 | 172 | Steel |  | Uncommon | 0 | 0 | 
173 | Captain Hook | Captain of the Jolly Roger | 1 | 173 | Steel |  | Rare | 0 | 0 | 
174 | Captain Hook | Forceful Duelist | 1 | 174 | Steel |  | Common | 0 | 0 | 
175 | Captain Hook | Thinking a Happy Thought | 1 | 175 | Steel |  | Rare | 0 | 0 | 
176 | Cerberus | Three-Headed Dog | 1 | 176 | Steel |  | Common | 0 | 0 | 
177 | Donald Duck | Musketeer | 1 | 177 | Steel |  | Uncommon | 0 | 0 | 
178 | Gantu | Galactic Federation Captain | 1 | 178 | Steel |  | Legendary | 0 | 0 | 
179 | Goons | Maleficent's Underlings | 1 | 179 | Steel |  | Common | 0 | 0 | 
180 | Hans | Thirteenth in Line | 1 | 180 | Steel |  | Super Rare | 0 | 0 | 
181 | Hercules | True Hero | 1 | 181 | Steel |  | Common | 0 | 0 | 
182 | Kristoff | Official Ice Master | 1 | 182 | Steel |  | Common | 0 | 0 | 
183 | Kronk | Right-Hand Man | 1 | 183 | Steel |  | Uncommon | 0 | 0 | 
184 | Lilo | Galactic Hero | 1 | 184 | Steel |  | Uncommon | 0 | 0 | 
185 | Maui | Demigod | 1 | 185 | Steel |  | Rare | 0 | 0 | 
186 | Mickey Mouse | Musketeer | 1 | 186 | Steel |  | Rare | 0 | 0 | 
187 | Prince Eric | Dashing and Brave | 1 | 187 | Steel |  | Common | 0 | 0 | 
188 | Simba | Future King | 1 | 188 | Steel |  | Common | 0 | 0 | 
189 | Simba | Returned King | 1 | 189 | Steel |  | Rare | 0 | 0 | 
190 | Simba | Rightful Heir | 1 | 190 | Steel |  | Uncommon | 0 | 0 | 
191 | Starkey | Hook's Henchman | 1 | 191 | Steel |  | Uncommon | 0 | 0 | 
192 | Te Kā | Heartless | 1 | 192 | Steel |  | Legendary | 0 | 0 | 
193 | Tinker Bell | Giant Fairy | 1 | 193 | Steel |  | Super Rare | 0 | 0 | 
194 | Tinker Bell | Tiny Tactician | 1 | 194 | Steel |  | Common | 0 | 0 | 
195 | A Whole New World |  | 1 | 195 | Steel |  | Super Rare | 0 | 0 | 
196 | Break |  | 1 | 196 | Steel |  | Common | 0 | 0 | 
197 | Fire the Cannons! |  | 1 | 197 | Steel |  | Common | 0 | 0 | 
198 | Grab Your Sword |  | 1 | 198 | Steel |  | Rare | 0 | 0 | 
199 | Ransack |  | 1 | 199 | Steel |  | Uncommon | 0 | 0 | 
200 | Smash |  | 1 | 200 | Steel |  | Uncommon | 0 | 0 | 
201 | Beast's Mirror |  | 1 | 201 | Steel |  | Common | 0 | 0 | 
202 | Frying Pan |  | 1 | 202 | Steel |  | Uncommon | 0 | 0 | 
203 | Musketeer Tabard |  | 1 | 203 | Steel |  | Rare | 0 | 0 | 
204 | Plasma Blaster |  | 1 | 204 | Steel |  | Rare | 0 | 0 | 
205 | Hades | King of Olympus | 1 | 205 | Amber |  | Enchanted | 0 | 0 | 
206 | Stitch | Carefree Surfer | 1 | 206 | Amber |  | Enchanted | 0 | 0 | 
207 | Elsa | Spirit of Winter | 1 | 207 | Amethyst |  | Enchanted | 0 | 0 | 
208 | Mickey Mouse | Wayward Sorcerer | 1 | 208 | Amethyst |  | Enchanted | 0 | 0 | 
209 | Genie | On the Job | 1 | 209 | Emerald |  | Enchanted | 0 | 0 | 
210 | Mickey Mouse | Artful Rogue | 1 | 210 | Emerald |  | Enchanted | 0 | 0 | 
211 | Aladdin | Heroic Outlaw | 1 | 211 | Ruby |  | Enchanted | 0 | 0 | 
212 | Maui | Hero to All | 1 | 212 | Ruby |  | Enchanted | 0 | 0 | 
213 | Aurora | Dreaming Guardian | 1 | 213 | Sapphire |  | Enchanted | 0 | 0 | 
214 | Belle | Strange but Special | 1 | 214 | Sapphire |  | Enchanted | 0 | 0 | 
215 | Simba | Returned King | 1 | 215 | Steel |  | Enchanted | 0 | 0 | 
216 | Tinker Bell | Giant Fairy | 1 | 216 | Steel |  | Enchanted | 0 | 0 |`;

        // Parse the data string
        const lines = dataString.split('\n');
        const headers = lines[1].split(' | ').map(h => h.trim());
        
        for (let i = 2; i < lines.length; i++) {
            const values = lines[i].split(' | ').map(v => v.trim());
            
            if (values.length >= 8) {
                const card = {
                    id: parseInt(values[0]),
                    name: values[1],
                    subtitle: values[2] || '',
                    set: parseInt(values[3]),
                    card_number: parseInt(values[4]),
                    color_1: values[5],
                    color_2: values[6] || '',
                    rarity: values[7],
                    normal: parseInt(values[8]) || 0,
                    foil: parseInt(values[9]) || 0
                };
                
                cards.push(card);
            }
        }
        
        // Load saved data from localStorage if available
        loadSavedData();
        
        // Initialize filters
        populateSetFilter();
        
        // Render the table
        filterCards();
    }
    
    // Load saved data from localStorage
    function loadSavedData() {
        const savedData = localStorage.getItem('lorcanaCardData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                
                // Update counts for existing cards
                parsedData.forEach(savedCard => {
                    const existingCard = cards.find(c => 
                        c.set === savedCard.set && 
                        c.card_number === savedCard.card_number
                    );
                    
                    if (existingCard) {
                        existingCard.normal = savedCard.normal;
                        existingCard.foil = savedCard.foil;
                    }
                });
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }
    
    // Save data to localStorage
    function saveData() {
        localStorage.setItem('lorcanaCardData', JSON.stringify(cards));
    }
    
    // Populate set filter dropdown
    function populateSetFilter() {
        const sets = [...new Set(cards.map(card => card.set))].sort();
        
        setFilter.innerHTML = '<option value="">All Sets</option>';
        sets.forEach(set => {
            const option = document.createElement('option');
            option.value = set;
            option.textContent = `Set ${set}`;
            setFilter.appendChild(option);
        });
    }
    
    // Filter and display cards
    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSet = setFilter.value;
        const selectedColor = colorFilter.value;
        const selectedRarity = rarityFilter.value;
        
        filteredCards = cards.filter(card => {
            const matchesSearch = 
                card.name.toLowerCase().includes(searchTerm) || 
                (card.subtitle && card.subtitle.toLowerCase().includes(searchTerm));
            
            const matchesSet = !selectedSet || card.set.toString() === selectedSet;
            const matchesColor = !selectedColor || card.color_1 === selectedColor || card.color_2 === selectedColor;
            const matchesRarity = !selectedRarity || card.rarity === selectedRarity;
            
            return matchesSearch && matchesSet && matchesColor && matchesRarity;
        });
        
        renderTable();
        updateSummary();
    }
    
    // Render the table
    function renderTable() {
        cardTableBody.innerHTML = '';
        
        if (filteredCards.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="9" style="text-align: center;">No cards found</td>';
            cardTableBody.appendChild(row);
            return;
        }
        
        filteredCards.forEach(card => {
            const row = document.createElement('tr');
            
            // Create color badge
            const colorBadge = document.createElement('span');
            colorBadge.className = `color-badge ${card.color_1.toLowerCase()}`;
            colorBadge.textContent = card.color_1;
            
            if (card.color_2) {
                const colorBadge2 = document.createElement('span');
                colorBadge2.className = `color-badge ${card.color_2.toLowerCase()}`;
                colorBadge2.textContent = card.color_2;
                colorBadge.appendChild(document.createTextNode(' / '));
                colorBadge.appendChild(colorBadge2);
            }
            
            row.innerHTML = `
                <td>${card.name}</td>
                <td>${card.subtitle || '-'}</td>
                <td>${card.set}</td>
                <td>${card.card_number}</td>
                <td></td>
                <td>${card.rarity}</td>
                <td><input type="number" class="count-input" min="0" value="${card.normal}" data-id="${card.id}" data-type="normal"></td>
                <td><input type="number" class="count-input" min="0" value="${card.foil}" data-id="${card.id}" data-type="foil"></td>
                <td class="action-cell">
                    <button class="action-btn" data-id="${card.id}">Save</button>
                    <button class="action-btn danger" data-id="${card.id}">Reset</button>
                </td>
            `;
            
            // Add color badge to the color cell
            const colorCell = row.cells[4];
            colorCell.appendChild(colorBadge);
            
            cardTableBody.appendChild(row);
        });
        
        // Add event listeners to count inputs and buttons
        document.querySelectorAll('.count-input').forEach(input => {
            input.addEventListener('change', handleCountChange);
        });
        
        document.querySelectorAll('.action-btn').forEach(button => {
            button.addEventListener('click', handleActionClick);
        });
        
        // Add sorting event listeners
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', () => handleSort(th.dataset.sort));
        });
    }
    
    // Handle count input changes
    function handleCountChange(e) {
        const cardId = parseInt(e.target.dataset.id);
        const type = e.target.dataset.type;
        const value = parseInt(e.target.value) || 0;
        
        const card = cards.find(c => c.id === cardId);
        if (card) {
            card[type] = value;
        }
    }
    
    // Handle action button clicks
    function handleActionClick(e) {
        const cardId = parseInt(e.target.dataset.id);
        const card = cards.find(c => c.id === cardId);
        
        if (!card) return;
        
        if (e.target.textContent === 'Save') {
            saveData();
            showNotification('Card counts saved!');
        } else if (e.target.textContent === 'Reset') {
            card.normal = 0;
            card.foil = 0;
            
            // Update the inputs
            const row = e.target.closest('tr');
            row.querySelector('input[data-type="normal"]').value = 0;
            row.querySelector('input[data-type="foil"]').value = 0;
            
            saveData();
            showNotification('Card counts reset!');
        }
    }
    
    // Handle sorting
    function handleSort(column) {
        // Toggle sort direction
        sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
        
        filteredCards.sort((a, b) => {
            let valueA = a[column];
            let valueB = b[column];
            
            // Handle special cases
            if (column === 'name' || column === 'subtitle' || column === 'rarity') {
                valueA = valueA ? valueA.toLowerCase() : '';
                valueB = valueB ? valueB.toLowerCase() : '';
            }
            
            if (valueA < valueB) return sortDirection[column] === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection[column] === 'asc' ? 1 : -1;
            return 0;
        });
        
        renderTable();
    }
    
    // Update summary statistics
    function updateSummary() {
        const total = filteredCards.length;
        const normalCount = filteredCards.reduce((sum, card) => sum + card.normal, 0);
        const foilCount = filteredCards.reduce((sum, card) => sum + card.foil, 0);
        
        totalCards.textContent = total;
        totalNormal.textContent = normalCount;
        totalFoil.textContent = foilCount;
    }
    
    // Handle file upload
    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                
                // Process the uploaded data
                processUploadedData(jsonData);
                
                showNotification('Card data uploaded successfully!');
            } catch (error) {
                console.error('Error processing file:', error);
                showNotification('Error processing file. Please check the format.', 'error');
            }
        };
        
        reader.readAsArrayBuffer(file);
        fileInput.value = ''; // Reset file input
    }
    
    // Process uploaded data
    function processUploadedData(jsonData) {
        // Skip header rows and extract cards
        const newCards = [];
        
        for (let i = 2; i < jsonData.length; i++) {
            const row = jsonData[i];
            
            if (row.length >= 8) {
                const card = {
                    id: parseInt(row[0]) || cards.length + newCards.length + 1,
                    name: row[1] || '',
                    subtitle: row[2] || '',
                    set: parseInt(row[3]) || 1,
                    card_number: parseInt(row[4]) || 1,
                    color_1: row[5] || '',
                    color_2: row[6] || '',
                    rarity: row[7] || '',
                    normal: 0,
                    foil: 0
                };
                
                newCards.push(card);
            }
        }
        
        // Add new cards to the collection
        cards = [...cards, ...newCards];
        
        // Update filters and table
        populateSetFilter();
        filterCards();
        
        // Save data
        saveData();
    }
    
    // Download current data
    function downloadData() {
        // Create a worksheet
        const wsData = [
            ['ID', 'Name', 'Subtitle', 'Set', 'Card Number', 'Color 1', 'Color 2', 'Rarity', 'Normal', 'Foil']
        ];
        
        cards.forEach(card => {
            wsData.push([
                card.id,
                card.name,
                card.subtitle,
                card.set,
                card.card_number,
                card.color_1,
                card.color_2,
                card.rarity,
                card.normal,
                card.foil
            ]);
        });
        
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Cards');
        
        // Generate and download the file
        XLSX.writeFile(wb, 'lorcana_card_tracker.xlsx');
        
        showNotification('Data downloaded successfully!');
    }
    
    // Reset all data
    function resetData() {
        if (confirm('Are you sure you want to reset all card counts? This cannot be undone.')) {
            cards.forEach(card => {
                card.normal = 0;
                card.foil = 0;
            });
            
            filterCards();
            saveData();
            showNotification('All card counts have been reset!');
        }
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
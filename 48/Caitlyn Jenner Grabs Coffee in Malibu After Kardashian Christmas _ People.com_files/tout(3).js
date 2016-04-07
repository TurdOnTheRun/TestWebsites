tcmAds.createTout = function(adVars) {
	if (typeof adVars.name == "undefined") {
		throw "You must supply a name for this tout";
	}

	var ad = {
		toutName : adVars.name,

		channels : {
			dflt : [
				'https://subscription.people.com/storefront/subscribe-to-people/link/1016755.html',
				'https://subscription.people.com/storefront/subscribe-to-people/link/1016754.html'
			]
		},
		clickThroughUrl1 : '',
		clickThroughUrl2 : '',

		xid : 'CHOPtextarticledefaultpink',

		channel: adVars.TCMchannel,
		formatForDoubleClick: function (url) {
			var tcm_dfpGet = adVars.clickTracking.dartGet,
				extra_qs = "",
				qs_param, qs_val;

			if (tcm_dfpGet != "%c") {
				url = tcm_dfpGet + url.replace("://","%3a%2f%2f");
			}

			for (qs_param in adVars.subs3Tracking) {
				qs_val = adVars.subs3Tracking[qs_param];

				if (/^%%PATTERN/.test(qs_val) || /^%s$/.test(qs_val)) {
					qs_val = "0000";
				}
				if (qs_val == "") {
					qs_val = "null";
				}

				extra_qs += "&" + qs_param + "=" + escape(qs_val);
			}

			// the first "&" should be a "?"
			if(!/\?/.test(url)){
				extra_qs = extra_qs.replace("&", "?");
			}

			return url + extra_qs;
		},

		stripSpecialChars : function (name) {
			var celebName = name.toLowerCase();
			celebName = celebName.replace(new RegExp("\'s", 'g'), "");
			celebName = celebName.replace(new RegExp("\'", 'g'), "");
			celebName = celebName.replace(new RegExp("\\s", 'g'), "_");
			celebName = celebName.replace(new RegExp("[àáâãäå]", 'g'), "a");
			celebName = celebName.replace(new RegExp("[èéêë]", 'g'), "e");
			celebName = celebName.replace(new RegExp("[ìíîï]", 'g'), "i");
			celebName = celebName.replace(new RegExp("ñ", 'g'), "n");
			celebName = celebName.replace(new RegExp("[òóôõö]", 'g'), "o");
			celebName = celebName.replace(new RegExp("[ùúûü]", 'g'), "u");
			celebName = celebName.replace(new RegExp("\\W", 'g'), "");
			return celebName;
		},

		omniTrack : function (oStr) {
			if((typeof(parent.s_account) != 'undefined') && (typeof(oStr) != 'undefined')){
				var s_time = parent.s_gi(parent.s_account);
				s_time.linkTrackVars = 'events,eVar26';
				s_time.linkTrackEvents = s_time.events = 'event46';
				s_time.eVar26 = oStr;
				s_time.tl(true, 'o', 'tcm tout');
				s_time.linkTrackVars = 'None';
				s_time.prop26 = s_time.events = '';
			}
		},

		renderCreative : function() {
			var celebrity = '';
			if(parent.document.getElementById('articleHeadline')){
				celebrity = parent.document.getElementById('articleHeadline').innerHTML;
			}
			celebrity = this.stripSpecialChars(celebrity);

			var patt = '';
			var celebHash = {};

			for(var i = 0; i < this.celebrities.celeb.length; i++){
				if(i == (this.celebrities.celeb.length-1)){
					patt = patt + this.celebrities.celeb[i].name;
				}else{
					patt = patt + this.celebrities.celeb[i].name + "|";
				}
				celebHash[this.celebrities.celeb[i].name] = i;
			}

			patt = new RegExp("(?:\\b|_)("+patt+")(?:[_\\b])","i");

			var celebsMatched = celebrity.match(patt);

			var celebString = 'your favorite celebs';
			var toutClickthrough = this.clickThroughUrl1;

			if(celebsMatched != null && celebsMatched.length >= 1){
				this.xid = 'CHOPtextarticlecontextpink';
				celebString = this.celebrities.celeb[celebHash[celebsMatched[1]]].fullname;
				toutClickthrough = this.clickThroughUrl2;
			}

			var toutText = '';

			var toutHTML = 'Keep up with ' + celebString + ' in the pages of PEOPLE Magazine <a href="' + toutClickthrough + '" style="color: #EE0077; font-weight: bold !important; text-decoration: underline !important; font-family: Arial, sans-serif !important; font-size: 14px;" target="_blank">by subscribing now</a>.';

			var tout = window.parent.document.createElement('div');
			//tout.className = 'relatedtext';
			tout.style.cssText = 'clear: both !important; font-size: 14px !important; font-family: Arial, sans-serif !important; font-style: italic !important; font-weight: bold !important;';
			tout.innerHTML = toutHTML;

			// Ad served in iframe
			if(window.frameElement){
				var iframe = parent.document.getElementById(window.frameElement.id);
				var parentElement = iframe.parentNode;
				parentElement.appendChild(tout);
				iframe.style.display = 'none';
			}else{
				var scriptId = document.getElementById('tcm-' + this.toutName + '-js');
				var parentElement = scriptId.parentNode;
				parentElement.appendChild(tout);
			}
		},
			
		setObject : function() {
			tcmAds[this.toutName] = this;
			if(window.frameElement){
				if(typeof window.parent.tcmAds !== 'undefined'){
					window.parent.tcmAds[this.toutName] = tcmAds[this.toutName];
				}else{
					window.parent.tcmAds = tcmAds;
				}
			}
		},

		build : function(){
			this.clickThroughUrl1 = this.formatForDoubleClick(this.channels[this.channel][0]);
			this.clickThroughUrl2 = this.formatForDoubleClick(this.channels[this.channel][1]);
			this.renderCreative();
			this.setObject();
			this.omniTrack(this.xid);
		},

		celebrities : {
			"celeb": [
				{"name":"adele","fullname": "Adele"},
				{"name":"alexander_skarsgard","fullname":"Alexander Skarsgard"},
				{"name":"ali_larter","fullname":"Ali Larter"},
				{"name":"alicia_keys","fullname":"Alicia Keys"},
				{"name":"amanda_bynes","fullname":"Amanda Bynes"},
				{"name":"amanda_seyfried","fullname":"Amanda Seyfried"},
				{"name":"amber_riley","fullname":"Amber Riley"},
				{"name":"america_ferrera","fullname":"America Ferrera"},
				{"name":"amy_adams","fullname":"Amy Adams"},
				{"name":"amy_winehouse","fullname":"Amy Winehouse"},
				{"name":"andrew_garfield","fullname":"Andrew Garfield"},
				{"name":"angelina_jolie","fullname":"Angelina Jolie"},
				{"name":"anna_nicole_smith","fullname":"Anna Nicole Smith"},
				{"name":"anna_paquin","fullname":"Anna Paquin"},
				{"name":"anne_hathaway","fullname":"Anne Hathaway"},
				{"name":"ashlee_simpson","fullname":"Ashlee Simpson"},
				{"name":"ashley_greene","fullname":"Ashley Greene"},
				{"name":"ashley_olsen","fullname":"Ashley Olsen"},
				{"name":"ashley_tisdale","fullname":"Ashley Tisdale"},
				{"name":"ashton_kutcher","fullname":"Ashton Kutcher"},
				{"name":"audrina_patridge","fullname":"Audrina Patridge"},
				{"name":"avril_lavigne","fullname":"Avril Lavigne"},
				{"name":"ben_affleck","fullname":"Ben Affleck"},
				{"name":"bethenny_frankel","fullname":"Bethenny Frankel"},
				{"name":"beyonce","fullname":"Beyonc&eacute; Knowles"},
				{"name":"blake_lively","fullname":"Blake Lively"},
				{"name":"blake_shelton","fullname":"Blake Shelton"},
				{"name":"brad_paisley","fullname":"Brad Paisley"},
				{"name":"brad_pitt","fullname":"Brad Pitt"},
				{"name":"bradley_cooper","fullname":"Bradley Cooper"},
				{"name":"britney_spears","fullname":"Britney Spears"},
				{"name":"brody_jenner","fullname":"Brody Jenner"},
				{"name":"brooke_shields","fullname":"Brooke Shields"},
				{"name":"bruce_willis","fullname":"Bruce Willis"},
				{"name":"celine_dion","fullname":"C&eacute;line Dion"},
				{"name":"cameron_diaz","fullname":"Cameron Diaz"},
				{"name":"carmen_electra","fullname":"Carmen Electra"},
				{"name":"carrie_underwood","fullname":"Carrie Underwood"},
				{"name":"cate_blanchett","fullname":"Cate Blanchett"},
				{"name":"catherine_zetajones","fullname":"Catherine Zeta-Jones"},
				{"name":"chace_crawford","fullname":"Chace Crawford"},
				{"name":"channing_tatum","fullname":"Channing Tatum"},
				{"name":"charlie_sheen","fullname":"Charlie Sheen"},
				{"name":"charlize_theron","fullname":"Charlize Theron"},
				{"name":"cheryl_burke","fullname":"Cheryl Burke"},
				{"name":"chris_brown","fullname":"Chris Brown"},
				{"name":"chris_hemsworth","fullname":"Chris Hemsworth"},
				{"name":"chris_pine","fullname":"Chris Pine"},
				{"name":"christian_bale","fullname":"Christian Bale"},
				{"name":"christina_aguilera","fullname":"Christina Aguilera"},
				{"name":"christina_applegate","fullname":"Christina Applegate"},
				{"name":"claire_danes","fullname":"Claire Danes"},
				{"name":"clay_aiken","fullname":"Clay Aiken"},
				{"name":"colin_farrell","fullname":"Colin Farrell"},
				{"name":"colin_firth","fullname":"Colin Firth"},
				{"name":"corbin_bleu","fullname":"Corbin Bleu"},
				{"name":"cory_monteith","fullname":"Cory Monteith"},
				{"name":"courteney_cox","fullname":"Courteney Cox"},
				{"name":"dakota_fanning","fullname":"Dakota Fanning"},
				{"name":"daniel_craig","fullname":"Daniel Craig"},
				{"name":"daniel_radcliffe","fullname":"Daniel Radcliffe"},
				{"name":"david_archuleta","fullname":"David Archuleta"},
				{"name":"david_beckham","fullname":"David Beckham"},
				{"name":"david_cook","fullname":"David Cook"},
				{"name":"demi_lovato","fullname":"Demi Lovato"},
				{"name":"demi_moore","fullname":"Demi Moore"},
				{"name":"denise_richards","fullname":"Denise Richards"},
				{"name":"denzel_washington","fullname":"Denzel Washington"},
				{"name":"diddy","fullname":"Diddy"},
				{"name":"drew_barrymore","fullname":"Drew Barrymore"},
				{"name":"ed_westwick","fullname":"Ed Westwick"},
				{"name":"elin_nordegren","fullname":"Elin Nordegren"},
				{"name":"elisabeth_hasselbeck","fullname":"Elisabeth Hasselbeck"},
				{"name":"ellen_degeneres","fullname":"Ellen DeGeneres"},
				{"name":"ellen_pompeo","fullname":"Ellen Pompeo"},
				{"name":"emily_blunt","fullname":"Emily Blunt"},
				{"name":"emma_stone","fullname":"Emma Stone"},
				{"name":"emma_watson","fullname":"Emma Watson"},
				{"name":"eva_longoria","fullname":"Eva Longoria"},
				{"name":"eva_mendes","fullname":"Eva Mendes"},
				{"name":"evan_rachel_wood","fullname":"Evan Rachel Wood"},
				{"name":"evangeline_lilly","fullname":"Evangeline Lilly"},
				{"name":"faith_hill","fullname":"Faith Hill"},
				{"name":"fergie","fullname":"Fergie"},
				{"name":"george_clooney","fullname":"George Clooney"},
				{"name":"gerard_butler","fullname":"Gerard Butler"},
				{"name":"gisele_bundchen","fullname":"Gisele B&uuml;ndchen"},
				{"name":"gwen_stefani","fullname":"Gwen Stefani"},
				{"name":"gwyneth_paltrow","fullname":"Gwyneth Paltrow"},
				{"name":"halle_berry","fullname":"Halle Berry"},
				{"name":"hayden_panettiere","fullname":"Hayden Panettiere"},
				{"name":"heath_ledger","fullname":"Heath Ledger"},
				{"name":"heather_locklear","fullname":"Heather Locklear"},
				{"name":"heidi_klum","fullname":"Heidi Klum"},
				{"name":"heidi_montag","fullname":"Heidi Montag"},
				{"name":"hilary_duff","fullname":"Hilary Duff"},
				{"name":"hugh_jackman","fullname":"Hugh Jackman"},
				{"name":"isla_fisher","fullname":"Isla Fisher"},
				{"name":"jake_gyllenhaal","fullname":"Jake Gyllenhaal"},
				{"name":"james_franco","fullname":"James Franco"},
				{"name":"jamie_lynn_spears","fullname":"Jamie Lynn Spears"},
				{"name":"janet_jackson","fullname":"Janet Jackson"},
				{"name":"january_jones","fullname":"January Jones"},
				{"name":"jennifer_aniston","fullname":"Jennifer Aniston"},
				{"name":"jennifer_garner","fullname":"Jennifer Garner"},
				{"name":"jennifer_hudson","fullname":"Jennifer Hudson"},
				{"name":"jennifer_lawrence","fullname":"Jennifer Lawrence"},
				{"name":"jennifer_lopez","fullname":"Jennifer Lopez"},
				{"name":"jenny_mccarthy","fullname":"Jenny McCarthy"},
				{"name":"jessica_alba","fullname":"Jessica Alba"},
				{"name":"jessica_biel","fullname":"Jessica Biel"},
				{"name":"jessica_simpson","fullname":"Jessica Simpson"},
				{"name":"jessica_szohr","fullname":"Jessica Szohr"},
				{"name":"joe_jonas","fullname":"Joe Jonas"},
				{"name":"joel_madden","fullname":"Joel Madden"},
				{"name":"john_krasinski","fullname":"John Krasinski"},
				{"name":"john_mayer","fullname":"John Mayer"},
				{"name":"johnny_depp","fullname":"Johnny Depp"},
				{"name":"jon_hamm","fullname":"Jon Hamm"},
				{"name":"jonas_brothers","fullname":"Jonas Brothers"},
				{"name":"jordin_sparks","fullname":"Jordin Sparks"},
				{"name":"josh_duhamel","fullname":"Josh Duhamel"},
				{"name":"josh_hartnett","fullname":"Josh Hartnett"},
				{"name":"josh_hutcherson","fullname":"Josh Hutcherson"},
				{"name":"jude_law","fullname":"Jude Law"},
				{"name":"julia_louis-dreyfus","fullname":"Julia Louis-Dreyfus"},
				{"name":"julia_roberts","fullname":"Julia Roberts"},
				{"name":"julianne_hough","fullname":"Julianne Hough"},
				{"name":"justin_bieber","fullname":"Justin Bieber"},
				{"name":"justin_timberlake","fullname":"Justin Timberlake"},
				{"name":"kanye_west","fullname":"Kanye West"},
				{"name":"kate_beckinsale","fullname":"Kate Beckinsale"},
				{"name":"kate_bosworth","fullname":"Kate Bosworth"},
				{"name":"kate_gosselin","fullname":"Kate Gosselin"},
				{"name":"kate_hudson","fullname":"Kate Hudson"},
				{"name":"kate_middleton","fullname":"Kate Middleton"},
				{"name":"kate_moss","fullname":"Kate Moss"},
				{"name":"kate_walsh","fullname":"Kate Walsh"},
				{"name":"kate_winslet","fullname":"Kate Winslet"},
				{"name":"katharine_mcphee","fullname":"Katharine McPhee"},
				{"name":"katherine_heigl","fullname":"Katherine Heigl"},
				{"name":"katie_holmes","fullname":"Katie Holmes"},
				{"name":"katy_perry","fullname":"Katy Perry"},
				{"name":"keanu_reeves","fullname":"Keanu Reeves"},
				{"name":"keira_knightley","fullname":"Keira Knightley"},
				{"name":"keith_urban","fullname":"Keith Urban"},
				{"name":"kellan_lutz","fullname":"Kellan Lutz"},
				{"name":"kellie_pickler","fullname":"Kellie Pickler"},
				{"name":"kelly_clarkson","fullname":"Kelly Clarkson"},
				{"name":"kelly_ripa","fullname":"Kelly Ripa"},
				{"name":"kendra_wilkinson","fullname":"Kendra Wilkinson"},
				{"name":"kenny_chesney","fullname":"Kenny Chesney"},
				{"name":"keri_russell","fullname":"Keri Russell"},
				{"name":"kevin_federline","fullname":"Kevin Federline"},
				{"name":"khloe_kardashian","fullname":"Khlo&eacute; Kardashian"},
				{"name":"kim_kardashian","fullname":"Kim Kardashian"},
				{"name":"kirsten_dunst","fullname":"Kirsten Dunst"},
				{"name":"kirstie_alley","fullname":"Kirstie Alley"},
				{"name":"kourtney_kardashian","fullname":"Kourtney Kardashian"},
				{"name":"kris_allen","fullname":"Kris Allen"},
				{"name":"kristen_bell","fullname":"Kristen Bell"},
				{"name":"kristen_stewart","fullname":"Kristen Stewart"},
				{"name":"kristin_cavallari","fullname":"Kristin Cavallari"},
				{"name":"lady_gaga","fullname":"Lady Gaga"},
				{"name":"lauren_conrad","fullname":"Lauren Conrad"},
				{"name":"lea_michele","fullname":"Lea Michele"},
				{"name":"leann_rimes","fullname":"LeAnn Rimes"},
				{"name":"leighton_meester","fullname":"Leighton Meester"},
				{"name":"leonardo_dicaprio","fullname":"Leonardo DiCaprio"},
				{"name":"liam_hemsworth","fullname":"Liam Hemsworth"},
				{"name":"lindsay_lohan","fullname":"Lindsay Lohan"},
				{"name":"liv_tyler","fullname":"Liv Tyler"},
				{"name":"lucy_liu","fullname":"Lucy Liu"},
				{"name":"maggie_gyllenhaal","fullname":"Maggie Gyllenhaal"},
				{"name":"mandy_moore","fullname":"Mandy Moore"},
				{"name":"mariah_carey","fullname":"Mariah Carey"},
				{"name":"mario_lopez","fullname":"Mario Lopez"},
				{"name":"mark_ballas","fullname":"Mark Ballas"},
				{"name":"mark_wahlberg","fullname":"Mark Wahlberg"},
				{"name":"mary-kate_olsen","fullname":"Mary-Kate Olsen"},
				{"name":"matt_damon","fullname":"Matt Damon"},
				{"name":"matthew_mcconaughey","fullname":"Matthew McConaughey"},
				{"name":"megan_fox","fullname":"Megan Fox"},
				{"name":"michelle_obama","fullname":"Michelle Obama"},
				{"name":"michelle_williams","fullname":"Michelle Williams"},
				{"name":"mila_kunis","fullname":"Mila Kunis"},
				{"name":"miley_cyrus","fullname":"Miley Cyrus"},
				{"name":"milo_ventimiglia","fullname":"Milo Ventimiglia"},
				{"name":"miranda_lambert","fullname":"Miranda Lambert"},
				{"name":"mischa_barton","fullname":"Mischa Barton"},
				{"name":"naomi_campbell","fullname":"Naomi Campbell"},
				{"name":"naomi_watts","fullname":"Naomi Watts"},
				{"name":"natalie_portman","fullname":"Natalie Portman"},
				{"name":"neil_patrick_harris","fullname":"Neil Patrick Harris"},
				{"name":"nick_lachey","fullname":"Nick Lachey"},
				{"name":"nicole_kidman","fullname":"Nicole Kidman"},
				{"name":"nicole_richie","fullname":"Nicole Richie"},
				{"name":"oprah_winfrey","fullname":"Oprah Winfrey"},
				{"name":"orlando_bloom","fullname":"Orlando Bloom"},
				{"name":"owen_wilson","fullname":"Owen Wilson"},
				{"name":"pamela_anderson","fullname":"Pamela Anderson"},
				{"name":"paris_hilton","fullname":"Paris Hilton"},
				{"name":"patrick_dempsey","fullname":"Patrick Dempsey"},
				{"name":"paula_abdul","fullname":"Paula Abdul"},
				{"name":"penelope_cruz","fullname":"Pen&eacute;lope Cruz"},
				{"name":"penn_badgley","fullname":"Penn Badgley"},
				{"name":"pete_wentz","fullname":"Pete Wentz"},
				{"name":"pink","fullname":"Pink"},
				{"name":"pippa_middleton","fullname":"Pippa Middleton"},
				{"name":"prince_harry","fullname":"Prince Harry"},
				{"name":"prince_william","fullname":"Prince William"},
				{"name":"queen_latifah","fullname":"Queen Latifah"},
				{"name":"rachael_ray","fullname":"Rachael Ray"},
				{"name":"rachel_bilson","fullname":"Rachel Bilson"},
				{"name":"rachel_mcAdams","fullname":"Rachel McAdams"},
				{"name":"rebecca_romijn","fullname":"Rebecca Romijn"},
				{"name":"reese_witherspoon","fullname":"Reese Witherspoon"},
				{"name":"renee_zellweger","fullname":"Ren&eacute;e Zellweger"},
				{"name":"rihanna","fullname":"Rihanna"},
				{"name":"robert_downey_jr","fullname":"Robert Downey Jr."},
				{"name":"robert_pattinson","fullname":"Robert Pattinson"},
				{"name":"rooney_mara","fullname":"Rooney Mara"},
				{"name":"rosario_dawson","fullname":"Rosario Dawson"},
				{"name":"rosie_odonnell","fullname":"Rosie O\'Donnell"},
				{"name":"rumer_willis","fullname":"Rumer Willis"},
				{"name":"ryan_gosling","fullname":"Ryan Gosling"},
				{"name":"ryan_phillippe","fullname":"Ryan Phillippe"},
				{"name":"ryan_reynolds","fullname":"Ryan Reynolds"},
				{"name":"ryan_seacrest","fullname":"Ryan Seacrest"},
				{"name":"salma_hayek","fullname":"Salma Hayek"},
				{"name":"sandra_bullock","fullname":"Sandra Bullock"},
				{"name":"sandra_oh","fullname":"Sandra Oh"},
				{"name":"sarah_jessica_parker","fullname":"Sarah Jessica Parker"},
				{"name":"sarah_michelle_gellar","fullname":"Sarah Michelle Gellar"},
				{"name":"scarlett_johansson","fullname":"Scarlett Johansson"},
				{"name":"selena_gomez","fullname":"Selena Gomez"},
				{"name":"shakira","fullname":"Shakira"},
				{"name":"shania_twain","fullname":"Shania Twain"},
				{"name":"sheryl_crow","fullname":"Sheryl Crow"},
				{"name":"shia_labeouf","fullname":"Shia LaBeouf"},
				{"name":"sienna_miller","fullname":"Sienna Miller"},
				{"name":"simon_cowell","fullname":"Simon Cowell"},
				{"name":"sofia_vergara","fullname":"Sofia Vergara"},
				{"name":"taylor_hicks","fullname":"Taylor Hicks"},
				{"name":"taylor_lautner","fullname":"Taylor Lautner"},
				{"name":"taylor_momsen","fullname":"Taylor Momsen"},
				{"name":"taylor_swift","fullname":"Taylor Swift"},
				{"name":"teri_hatcher","fullname":"Teri Hatcher"},
				{"name":"tiger_woods","fullname":"Tiger Woods"},
				{"name":"tim_mcgraw","fullname":"Tim McGraw"},
				{"name":"tina_fey","fullname":"Tina Fey"},
				{"name":"tom_brady","fullname":"Tom Brady"},
				{"name":"tom_cruise","fullname":"Tom Cruise"},
				{"name":"tori_spelling","fullname":"Tori Spelling"},
				{"name":"tyra_banks","fullname":"Tyra Banks"},
				{"name":"usher","fullname":"Usher"},
				{"name":"vanessa_hudgens","fullname":"Vanessa Hudgens"},
				{"name":"vanessa_minnillo","fullname":"Vanessa Minnillo"},
				{"name":"vanessa_williams","fullname":"Vanessa Williams"},
				{"name":"victoria_beckham","fullname":"Victoria Beckham"},
				{"name":"vince_vaughn","fullname":"Vince Vaughn"},
				{"name":"whitney_port","fullname":"Whitney Port"},
				{"name":"will_smith","fullname":"Will Smith"},
				{"name":"winona_ryder","fullname":"Winona Ryder"},
				{"name":"zac_efron","fullname":"Zac Efron"},
				{"name":"zoe_saldana","fullname":"Zo&euml; Saldana"}
			]
		}
	};

	ad.build();
};

tcmAds.createTout(tcmAds['pe-mcktoutnewpink0215.config']);
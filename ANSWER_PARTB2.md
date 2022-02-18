คำตอบ Part B2: Architecture Design Task
1.Folder Structure ที่จะใช้ในการจัดวาง
-node_modules
-public
 	--index.html
-src
	-layouts
	--Footer
        --Footer.js
        --index.js
	--MainContainer
		-- MainContainer.js
        --index.js
	--Navbar
		--Navbar.js	
        --index.js
	--Header
		---Header.js
		---index.js
	-Assets
		-Images
            --img.png
	-service
        -Auth
		    --AunthContext.js
-components
	--forms
		-TextFiled
            --TextFiled.js
			--index.js
		-Radio
			--Radio.js
			--Index.js
		-Button
			-- Button.js
			--Index.js
		--Text
			--Text.js
			--Index.js
-Pages
	-RegisMarathon
		--RegisMarathon.js
		--index.js
	--index.js
	--App.js

2.Library ที่คาดว่าจะใช้สำหรับ Project นี้ พร้อมทั้งระบุด้วยว่าทำไมถึงเลือกใช้
    2.1 Lib
        - Axios ใช้เพื่อดึงข้อมูล Api จาก backend หรือ ส่่งข้อมูล เมื่อ User กรอกแบบฟอร์มแต่ละ Step 
        - Framework Css meterial design เพราะ มีความชำนาญในการใช้ Component css ตัวนี้เป็นพิเศษ

3.จะต้องจัดการ State ของข้อมูลอย่างไร เพื่อรองรับกับโจทย์นี้ได้

    การจัดการ state แบ่งออกเป็น 2 หัวข้อหลัก 
    3.1 ขั้นตอนสร้าง constant เก็บข้อมูล user
    3.2 ขั้นตอนการจัด Display ของฟอร์มการลงทะเบียนทั้ง 4 ขั้นตอน

    หัวข้อ 3.1 ขั้นตอนสร้าง constant เก็บข้อมูล user
    state ที่เก็บข้อมูล userRegis จะมีส่วนประกอบใน array เพื่อส่งไป api backekend มีดังนี้
    userRegis:[{
        userId:{
            id:'';
        },
        step:{
            step:0;
        },
        personInfo:{
            tile:0,
            firstname:'',
            lastname:'',
            birthdate:'',
            email:'',
            idcardNo:'',
            address:'',
            contract:'',
            photo:'',
            nameofresgis:'';
        },
        detailsRun:{
            isMarthorn:false,
            expectTime:'';
        },
        emerContact:[{
            fullname:'',
            relation:'',
            phone:''
        }],
        medicalInfo:{
           bloodType:0,
           haveMedical: '',
           haveChonicHealth:'',
           haveSurgery:'',
           havePregnant :'',
           havePersonMed:'',
           haveInjured:'',
           isExercise:false,
           isFeltChest:'';
        },
        Souvenir:{
            sizeShirt:0;
        }
    }]

    3.2 ขั้นตอนการจัด Display ของฟอร์มการลงทะเบียนทั้งหมด 3 ขั้นตอน
    3.2.1) ทำการตรวจสอบว่า user คนนี้เคย register หรือเคย save draft มาก่อน
    โดยมีวิธีการดังนี้
    ทำการ fetch(UseEffect) api จาก backend Method Get ใน RegisMarathon.js ใส่ state userRegis เพื่อดูว่า ข้อมูล json object ที่ส่งมามี step หรือเปล่า กรณีที่มี step ===null แสดงว่า user ทำการลงทะเบียนครั้งแรก และ ถ้าหากว่า step !== null แสดงว่า user เคย save draft ข้อมูลไว้และลงทะเบียนยังไม่เสร็จสิ้น

    3.2.2) ตรวจสอบเงื่อนไข step ใน state จาก userRegis มีค่าเท่ากับ step เท่าไร
    ในกรณี step === 0
    -ไฟล์ DisPlayMarathon.js จะแสดง form ใน user กรอกข้อมูลส่วนตัว 
    ในกรณี step === 1
    -ไฟล์ DisPlayMarathon.js จะแสดง form ใน user กรอกข้อมูลเกี่ยวกับการวิ่ง,ข้อมูลผู้ติดต่อฉุกเฉิน,ข้อมูลทางการแพทย์,เสื้อของที่ระลึก
    ในกรณี step === 2
    -ไฟล์ DisPlayMarathon.js จะแสดงรายละเอียดของฟอร์มที่ user กรอกไว้ก่อนนี้นี้ทั้งหมด

4.จะใช้วิธีใดในการ Validate Form สำหรับการ Save Draft และสำหรับการ Submit

   การ validate ฟอร์มแต่ละ step 
    -ขั้นตอน step ===0(อ้างอิงจากข้อ3.2.2) 

    จะมีฟอร์มกรอกข้อมูลส่วนตัวและมี Button 2 ปุ่ม ปรากฏให้ user กรอกข้อมูล
    Button Save Draft : event นี้จะไม่มีการ Validate แต่เมื่อคลิกปุ่ม จะมีการนำข้อมูลใน state userRegis ส่งเข้าไปใน API(method:Post) เพื่อสร้าง userId และ เก็บข้อข้อมูลส่วนตัวที่ user input เข้ามา
    Button Next: event นี้จะมีการตรวจสอบ state ใน userRegis.personInfo โดยมีเงื่อนไขข้อมูลไหน null จะไม่สามารถกด Next ได้ 
    userRegis.personInfo(อ้างอิงมาจากข้อ3.1)
    personInfo:{
            tile:0,
            firstname:'',
            lastname:'',
            birthdate:'',
            email:'',
            idcardNo:'',
            address:'',
            contract:'',
            photo:'',
            nameofresgis:'';
        },
    โดยถ้าตรวจสอบเงื่อนไขครบถ้วนจะมีการส่ง userRegis ไป save ใน API และ ให้ backend เปลี่ยน userRegis.step เป็น 1 

    -ขั้นตอน step ===1(อ้างอิงจากข้อ3.2.2) 
    จะมีฟอร์มกรอกข้อมูลเกี่ยวกับการวิ่ง,ข้อมูลผู้ติดต่อฉุกเฉิน Button 2 ปุ่ม ปรากฏให้ user กรอกข้อมูล
    Button Save Draft : event นี้จะไม่มีการ Validate แต่เมื่อคลิกปุ่ม จะมีการนำข้อมูลใน state userRegis ส่ง save เข้า API
    Button Next: event นี้จะมีการตรวจสอบ state ใน userRegis.detailsRun ,userRegis.emerContact,userRegis.medicalInfo,user.Souvenir

    detailsRun:{
            isMarthorn:false,
            expectTime:'';
        },
        emerContact:[{
            fullname:'',
            relation:'',
            phone:''
        }],
        medicalInfo:{
           bloodType:0,
           haveMedical: '',
           haveChonicHealth:'',
           haveSurgery:'',
           havePregnant :'',
           havePersonMed:'',
           haveInjured:'',
           isExercise:false,
           isFeltChest:'';
        },
        Souvenir:{
            sizeShirt:0;
        }

    โดยมีเงื่อนการ Validate ดังนี้
    1.  userRegis.detailsRun
        ตรวจสอบเงื่อนไข detailsRun.expectTime !== null 
    2. userRegis.emerContact
        ตรวจสอบเงื่อนไข detailsRun.fullname !== null 
        ตรวจสอบเงื่อนไข detailsRun.relation !== null 
        ตรวจสอบเงื่อนไข detailsRun.expectTime !== phone 
    3 userRegis.medicalInfo(ใช้ Radio โดย defaultValue checked= null)
        ตรวจสอบเงื่อนไข medicalInfo.haveMedical !== null && checked !==null
        ตรวจสอบเงื่อนไข medicalInfo.haveChonicHealth !== null && checked !==null
        ตรวจสอบเงื่อนไข medicalInfo.haveSurgery !== null && checked !==null
        ตรวจสอบเงื่อนไข medicalInfo.havePregnant !== null && checked !==null
        ตรวจสอบเงื่อนไข medicalInfo.havePersonMed !== null && checked !==null
        ตรวจสอบเงื่อนไข medicalInfo.haveInjured !== null && checked !==null
        ตรวจสอบเงื่อนไข medicalInfo.isFeltChest !== null && checked !==null
    โดยถ้าตรวจสอบเงื่อนไขครบถ้วนจะมีการส่ง userRegis ไป save ใน API และ ให้ backend เปลี่ยน userRegis.step เป็น 2

    -ขั้นตอน step ===2(อ้างอิงจากข้อ3.2.2) 
    จะมีข้อมูลที่ user เคยกรอกไว้ทั้งผลทำมาแสดงผลเพื่อให้ user เลือกปุ่ม  ฺSubmit หรือ Back  
    Back : เมื่อ user เลือก action event นี้ state userRegis จะถูกส่งเข้า API เพื่อเก็บข้อมูล user และ backend ทำการเปลี่ยน ข้อมูล userRegis.step = 0 เพื่อให้เข้าเงื่อนไขให้แสดงแบบฟอร์มขั้นตอน 0(อ้างอิงจาก 3.2.2)
     ฺSubmit: ข้อมูล userRegis ทั้งหมด จะถูกส่งไปยัง API backend เสร็จสิ้น



    
        

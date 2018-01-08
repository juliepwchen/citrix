/**
 * 
 */
package com.citrix.autotimelog.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.citrix.autotimelog.domain.Meeting;
import com.citrix.autotimelog.domain.CitrixMenuItem;
import com.citrix.autotimelog.service.GotoMeetingService;

/**
 * @author juliechen
 *
 */
@RestController
public class GotoMeetingController {
	
   private static AtomicInteger countAuthenticated = new AtomicInteger(0);
   private static AtomicInteger countLogin = new AtomicInteger(0);
	
   @Autowired
   private GotoMeetingService gotoMeetingService;
   
   @RequestMapping("/InitializeApplication")
   public Map<String, Object> initializeApplication(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password)
   {
	   Map<String, Object> isLogin = new HashMap();
	   
	   if (countLogin.intValue() ==2) {isLogin.put("IsAuthenicated", "true"); countLogin.getAndSet(0); }
	   isLogin.put("IsAuthenicated", "false");
	   countLogin.getAndIncrement();
	   isLogin.put("IsAuthenicated", "false");
	   
	   List<CitrixMenuItem> menuItems = new ArrayList();
	   CitrixMenuItem menu1 = new CitrixMenuItem();
	   CitrixMenuItem menu2 = new CitrixMenuItem();
	   menu1.setDescription("Login");
	   menu1.setRoute("#Accounts/Login");
	   menu2.setDescription("Register");
	   menu2.setRoute("#Accounts/Register");
	   menuItems.add(menu1);
	   menuItems.add(menu2);
	   
	   isLogin.put("MenuItems", menuItems);
       return isLogin;
   }
   
   @RequestMapping("/AuthenicateUser")
   public Map<String, String> isAuthenticated(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password)
   {
	   Map<String, String> isAuthenticated = new HashMap();
	   
	   if (countAuthenticated.intValue() ==2) {isAuthenticated.put("IsAuthenicated", "true"); countAuthenticated.getAndSet(0); }
	   isAuthenticated.put("IsAuthenicated", "false");
	   countAuthenticated.getAndIncrement();
	 
       return isAuthenticated;
   }
   
   @RequestMapping("/login")
   public Map<String, String> isLogin(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password)
   {
	   Map<String, String> isAuthenticated = new HashMap();
	   if (username.equals("admin@gmail.com".trim()) && password.equals("admin".trim())) { 
		   
		   isAuthenticated.put("IsAuthenicated", "true"); 
	   }
	   else { isAuthenticated.put("IsAuthenicated", "false"); }
	 
	   isAuthenticated.put("Username", username);
	   isAuthenticated.put("Password", password);
       return isAuthenticated;
   }
   
   @RequestMapping("/gotomeeting")
   public ResponseEntity<Meeting[]> getAllMeetings(@RequestParam(value="username", defaultValue="") String username, @RequestParam(value="password", defaultValue="") String password)
   {
     return gotoMeetingService.getAllMeetings(username, password);
   }
   
   @RequestMapping("/gettime")
   public Map<String, String> getTimeSpentAtMeetings(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password,
		   @RequestParam(value="startDate", defaultValue="") String startDate,
		   @RequestParam(value="endDate", defaultValue="") String endDate)
   {
     return gotoMeetingService.getTimeSpentAtMeetings(username, password, startDate, endDate);

   } 
   
   @RequestMapping("/getdurations")
   public Map<String, String> getDurations(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password,
		   @RequestParam(value="startDate", defaultValue="") String startDate,
		   @RequestParam(value="endDate", defaultValue="") String endDate)
   {
     return gotoMeetingService.getDurations(username, password, startDate, endDate);

   } 
   
   
}

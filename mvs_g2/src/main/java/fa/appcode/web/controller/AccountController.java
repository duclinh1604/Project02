package fa.appcode.web.controller;

import fa.appcode.web.dto.AccountDTO;
import fa.appcode.web.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;

@Controller
public class AccountController {
    @Autowired
    private AccountService accountService;
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String showLogin(){
        return "index";
    }
    @RequestMapping(value = "/register-form", method = RequestMethod.GET)
    public String showRegister(Model model){
        model.addAttribute("accountDTO", new AccountDTO());
        return "register";
    }
    @RequestMapping(value = "/register-account", method = RequestMethod.POST)
    public String registerAccount(@ModelAttribute(value = "accountDTO") AccountDTO accountDTO) throws ParseException {
        accountService.save(accountDTO);
        return "index";
    }
    @PostMapping("")
    @ResponseBody
    public ResponseEntity<AccountDTO> registerNewAccount(@Valid @RequestBody AccountDTO accountDTO) throws ParseException {
        return new ResponseEntity<>(accountService.save(accountDTO), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/account-detail/{id}", method = RequestMethod.GET)
    public String showAccount(@PathVariable(value = "id") int id, Model model) throws ParseException {
        model.addAttribute("accountDTO", accountService.findById(id));
        return "account-detail";
    }
    @RequestMapping(value = "/update-account", method = RequestMethod.POST)
    public String updateAccount(@ModelAttribute (value = "accountDTO") AccountDTO accountDTO) throws ParseException {
        accountService.update(accountDTO);
        return "index";
    }
}
